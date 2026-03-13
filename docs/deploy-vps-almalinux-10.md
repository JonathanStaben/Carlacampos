# Guia de Deploy no VPS

## Objetivo

Este documento explica como publicar o projeto `carlacampos` em um VPS com `AlmaLinux 10`, usando:

- `GitHub` privado via chave SSH
- `Node.js`
- `PM2`
- `Nginx`
- `firewalld`
- `SELinux`

Ambiente alvo deste guia:

- Host: `srv1487649.hstgr.cloud`
- IP: `82.25.66.101`
- Usuario SSH: `root`
- Sistema operacional: `AlmaLinux 10`

## Resumo da Estrategia

O deploy deste projeto segue este fluxo:

1. conectar no VPS
2. instalar dependencias do sistema
3. instalar `Node.js`
4. configurar acesso ao repositrio privado com chave SSH
5. clonar o projeto
6. instalar dependencias do app
7. gerar o build de producao
8. subir o projeto com `PM2`
9. publicar com `Nginx`
10. liberar acesso no firewall
11. ajustar `SELinux` para permitir proxy reverso

## Informacoes Importantes

### Sobre o Node.js no AlmaLinux 10

No `AlmaLinux 10`, o fluxo com `dnf module enable nodejs:20` pode falhar porque a modularidade foi descontinuada nesse cenario.

Use a instalacao direta pelo pacote do sistema:

```bash
dnf install -y nodejs git nginx openssh-clients
```

O `npm` normalmente vem junto com o pacote `nodejs`.

### Sobre o Repositorio Privado

Como o repositorio e privado, a melhor forma de deploy no servidor e usar uma `Deploy Key` SSH do GitHub.

Isso evita:

- uso de senha
- uso de token pessoal em comando
- falhas em `git pull` por autenticacao

## Passo 1. Conectar no servidor

No seu computador local:

```bash
ssh root@82.25.66.101
```

## Passo 2. Atualizar o sistema

Ja dentro do servidor:

```bash
dnf update -y
```

Opcionalmente, limpe e regenere o cache se houver comportamento estranho:

```bash
dnf clean all
dnf makecache
```

## Passo 3. Instalar pacotes necessarios

```bash
dnf install -y nodejs git nginx openssh-clients
```

Verifique:

```bash
node -v
npm -v
git --version
nginx -v
```

## Passo 4. Instalar PM2

```bash
npm install -g pm2
pm2 -v
```

## Passo 5. Criar chave SSH para acesso ao GitHub

Crie a pasta SSH e gere a chave:

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
ssh-keygen -t ed25519 -C "deploy-carlacampos" -f ~/.ssh/carlacampos_deploy
```

Quando o terminal pedir a passphrase:

- pode apertar `Enter`
- pode deixar vazia no servidor para facilitar o deploy

## Passo 6. Copiar a chave publica

Exiba a chave publica:

```bash
cat ~/.ssh/carlacampos_deploy.pub
```

Exemplo de formato esperado:

```text
ssh-ed25519 AAAA... deploy-carlacampos
```

Importante:

- copie a linha inteira
- use apenas a chave publica, isto e, o arquivo `.pub`
- nunca compartilhe a chave privada `~/.ssh/carlacampos_deploy`

## Passo 7. Adicionar a chave no GitHub

No repositrio `JonathanStaben/Carlacampos`:

1. acesse `Settings`
2. acesse `Deploy keys`
3. clique em `Add deploy key`
4. preencha o titulo, por exemplo: `VPS AlmaLinux`
5. cole a chave publica inteira
6. deixe `Allow write access` desmarcado
7. salve

## Passo 8. Configurar o SSH do servidor

Crie o arquivo:

```bash
nano ~/.ssh/config
```

Cole:

```ssh
Host github-carlacampos
    HostName github.com
    User git
    IdentityFile ~/.ssh/carlacampos_deploy
    IdentitiesOnly yes
```

Depois ajuste as permissoes:

```bash
chmod 600 ~/.ssh/config
chmod 600 ~/.ssh/carlacampos_deploy
chmod 644 ~/.ssh/carlacampos_deploy.pub
```

## Passo 9. Testar a autenticacao com o GitHub

```bash
ssh -T git@github-carlacampos
```

Na primeira vez, confirme o host com:

```text
yes
```

Se tudo estiver certo, a resposta sera parecida com:

```text
Hi JonathanStaben/Carlacampos! You've successfully authenticated, but GitHub does not provide shell access.
```

## Passo 10. Clonar o repositorio no servidor

```bash
mkdir -p /var/www
cd /var/www
git clone git@github-carlacampos:JonathanStaben/Carlacampos.git carlacampos
cd /var/www/carlacampos
```

## Passo 11. Instalar dependencias do projeto

```bash
npm ci
```

## Passo 12. Gerar o build de producao

```bash
npm run build
```

Se esse passo terminar sem erros, o projeto esta pronto para subir.

## Passo 13. Subir a aplicacao com PM2

Dentro de ` /var/www/carlacampos `:

```bash
pm2 start npm --name carlacampos -- start
pm2 save
pm2 startup systemd
```

O comando `pm2 startup systemd` vai exibir uma linha adicional. Execute exatamente a linha mostrada pelo terminal.

Depois confirme:

```bash
pm2 status
pm2 logs carlacampos
```

## Passo 14. Testar localmente no servidor

Antes de configurar o `Nginx`, confirme se o app responde localmente:

```bash
curl http://127.0.0.1:3000
```

Se aparecer HTML, a aplicacao esta funcionando corretamente.

## Passo 15. Configurar o Nginx

Crie o arquivo:

```bash
nano /etc/nginx/conf.d/carlacampos.conf
```

Cole o conteudo:

```nginx
server {
    listen 80;
    server_name carlahematologista.com.br www.carlahematologista.com.br 82.25.66.101 srv1487649.hstgr.cloud;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Teste a configuracao:

```bash
nginx -t
```

Se estiver tudo certo:

```bash
systemctl enable --now nginx
systemctl restart nginx
systemctl status nginx
```

## Passo 16. Liberar firewall

No `AlmaLinux`, o firewall padrao costuma ser o `firewalld`.

Ative e libere HTTP e HTTPS:

```bash
systemctl enable --now firewalld
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --reload
firewall-cmd --list-all
```

## Passo 17. Ajustar o SELinux

Em `AlmaLinux`, o `SELinux` pode bloquear o `Nginx` ao tentar acessar a aplicacao na porta `3000`.

Se o site mostrar `502 Bad Gateway`, rode:

```bash
setsebool -P httpd_can_network_connect 1
systemctl restart nginx
```

## Passo 18. Testar no navegador

Abra:

- `http://82.25.66.101`
- `http://srv1487649.hstgr.cloud`
- `http://carlahematologista.com.br`

## Passo 19. Certificado SSL (HTTPS)

No `AlmaLinux 10`, use `dnf` para instalar o Certbot e o plugin do Nginx:

```bash
dnf install -y python3-certbot-nginx
```

Se o pacote nao for encontrado, habilite o EPEL e tente novamente:

```bash
dnf install -y epel-release
dnf install -y python3-certbot-nginx
```

Gere o certificado SSL para o dominio:

```bash
certbot --nginx -d carlahematologista.com.br -d www.carlahematologista.com.br
```

O Certbot vai solicitar:

- e-mail (para avisos de renovacao)
- aceite dos termos (responda `Y`)
- opcao de receber novidades (pode responder `N`)

O Certbot configura o Nginx automaticamente e redireciona HTTP para HTTPS.

Teste a renovacao automatica:

```bash
certbot renew --dry-run
```

Se nao houver erros, a renovacao ja esta configurada (cron ou timer do systemd).

Depois, acesse:

- `https://carlahematologista.com.br`
- `https://www.carlahematologista.com.br`

## Atualizacao futura do projeto

Depois que o servidor estiver pronto, toda atualizacao do projeto segue este fluxo:

```bash
ssh root@82.25.66.101
cd /var/www/carlacampos
git pull origin main
npm ci
npm run build
pm2 restart carlacampos
```

## Comandos uteis de diagnostico

Verificar versoes:

```bash
node -v
npm -v
pm2 -v
```

Verificar processo:

```bash
pm2 status
pm2 logs carlacampos
```

Verificar `Nginx`:

```bash
nginx -t
systemctl status nginx
```

Verificar se a aplicacao esta ouvindo:

```bash
ss -tulpn | grep 3000
curl http://127.0.0.1:3000
```

Verificar firewall:

```bash
firewall-cmd --list-all
```

## Erros comuns e como resolver

### Erro: `missing groups or modules: nodejs:20`

Causa:

- tentativa de usar `dnf module` em um ambiente onde esse fluxo nao esta disponivel

Solucao:

```bash
dnf install -y nodejs git nginx openssh-clients
```

### Erro: `node: command not found`

Causa:

- o pacote `nodejs` ainda nao foi instalado com sucesso

Solucao:

```bash
dnf install -y nodejs
node -v
```

### Erro: `npm: command not found`

Causa:

- `nodejs` ainda nao foi instalado corretamente

Solucao:

```bash
dnf install -y nodejs
npm -v
```

### Erro ao colar comandos no terminal

Sintomas:

- mensagens como `command not found` para `WARNING:`, `Complete!`, `[root@...]`

Causa:

- foi colada no terminal a saida anterior junto com os comandos

Solucao:

- cole apenas os comandos
- nao cole blocos com resultado anterior do shell

### Erro: autenticacao Git falhou

Verifique:

```bash
ssh -T git@github-carlacampos
```

Se falhar:

- confirme se a chave publica foi adicionada em `Deploy keys`
- confirme o conteudo de `~/.ssh/config`
- confirme as permissoes dos arquivos em `~/.ssh`

### Erro: `502 Bad Gateway`

Checklist:

```bash
pm2 status
curl http://127.0.0.1:3000
setsebool -P httpd_can_network_connect 1
systemctl restart nginx
```

### Site nao abre externamente

Checklist:

```bash
systemctl status nginx
firewall-cmd --list-all
curl http://127.0.0.1:3000
```

## Sequencia rapida de comandos

### Preparacao inicial

```bash
ssh root@82.25.66.101
dnf update -y
dnf install -y nodejs git nginx openssh-clients
node -v
npm -v
npm install -g pm2
```

### Configuracao Git privado

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
ssh-keygen -t ed25519 -C "deploy-carlacampos" -f ~/.ssh/carlacampos_deploy
cat ~/.ssh/carlacampos_deploy.pub
nano ~/.ssh/config
chmod 600 ~/.ssh/config
chmod 600 ~/.ssh/carlacampos_deploy
chmod 644 ~/.ssh/carlacampos_deploy.pub
ssh -T git@github-carlacampos
```

### Clone e deploy da aplicacao

```bash
mkdir -p /var/www
cd /var/www
git clone git@github-carlacampos:JonathanStaben/Carlacampos.git carlacampos
cd /var/www/carlacampos
npm ci
npm run build
pm2 start npm --name carlacampos -- start
pm2 save
pm2 startup systemd
curl http://127.0.0.1:3000
```

### Publicacao com Nginx

```bash
nano /etc/nginx/conf.d/carlacampos.conf
nginx -t
systemctl enable --now nginx
systemctl restart nginx
systemctl enable --now firewalld
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --reload
setsebool -P httpd_can_network_connect 1
systemctl restart nginx
```

### Certificado SSL (HTTPS)

```bash
dnf install -y python3-certbot-nginx
certbot --nginx -d carlahematologista.com.br -d www.carlahematologista.com.br
certbot renew --dry-run
```

## Observacao final

Se o projeto compilar com `npm run build` e responder em `curl http://127.0.0.1:3000`, praticamente toda a parte da aplicacao estara correta. A partir dai, os problemas restantes normalmente ficam concentrados em:

- configuracao do `Nginx`
- `firewalld`
- `SELinux`
- DNS ou dominio
