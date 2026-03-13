# Guia de Indexacao no Google

## Objetivo

Este guia explica como fazer o site `carlahematologista.com.br` aparecer no Google e como melhorar a apresentacao dele em resultados de busca, compartilhamentos e navegadores.

Importante:

- aparecer no `WhatsApp` e em redes sociais usa `Open Graph`
- aparecer no Google usa principalmente `indexacao`, `sitemap`, `Search Console`, `SEO tecnico` e `favicon`
- aparecer no mapa/local pack do Google usa `Perfil da Empresa no Google`

## O que ja foi configurado no projeto

Este projeto ja esta preparado com:

- `metadata` base para o dominio oficial
- imagem de compartilhamento em `Open Graph`
- `favicon` em `src/app/icon.svg`
- `robots.txt` gerado por `src/app/robots.ts`
- `sitemap.xml` gerado por `src/app/sitemap.ts`
- dados estruturados `schema.org` do tipo `Physician`

Depois do deploy, voce pode validar estes enderecos:

- `https://carlahematologista.com.br/robots.txt`
- `https://carlahematologista.com.br/sitemap.xml`
- `https://carlahematologista.com.br/opengraph-image`

## Antes de pedir indexacao

Confirme estes itens:

1. o site abre em `https://carlahematologista.com.br`
2. o certificado SSL esta funcionando
3. o dominio principal abre sem erro
4. o site responde tambem em celular
5. o Nginx esta servindo a versao mais recente do deploy

## Passo 1. Criar conta no Google Search Console

1. acesse [Google Search Console](https://search.google.com/search-console/about)
2. clique em `Comecar agora`
3. escolha a conta Google que vai administrar o site

## Passo 2. Adicionar a propriedade do site

Voce tera duas opcoes principais:

- `Dominio`
- `Prefixo do URL`

O ideal e usar `Dominio`, porque cobre:

- `http`
- `https`
- `www`
- sem `www`

No seu caso, adicione:

```text
carlahematologista.com.br
```

## Passo 3. Verificar o dominio no Registro.br

Ao escolher a opcao `Dominio`, o Google vai pedir um registro `TXT` no DNS.

O fluxo e:

1. copiar o valor TXT fornecido pelo Google
2. entrar no `Registro.br`
3. abrir o dominio `carlahematologista.com.br`
4. entrar na area de `DNS`
5. adicionar um registro `TXT`
6. colar o valor dado pelo Google
7. salvar

Exemplo de formato:

```text
google-site-verification=abc123...
```

Depois:

1. volte ao `Google Search Console`
2. clique em `Verificar`

Observacao:

- a propagacao pode levar alguns minutos
- se nao validar na hora, espere um pouco e tente de novo

## Passo 4. Enviar o sitemap

Depois da verificacao:

1. no menu esquerdo, clique em `Sitemaps`
2. no campo de envio, informe:

```text
sitemap.xml
```

3. clique em `Enviar`

O endereco completo sera:

```text
https://carlahematologista.com.br/sitemap.xml
```

## Passo 5. Pedir indexacao da pagina principal

Depois do sitemap:

1. no topo do Search Console, use `Inspecao de URL`
2. cole:

```text
https://carlahematologista.com.br/
```

3. aguarde a analise
4. clique em `Solicitar indexacao`

Isso nao faz o site aparecer imediatamente, mas acelera o processo.

## Passo 6. Conferir se o Google consegue ler a pagina

No Search Console, confira:

- `Indexacao > Paginas`
- `Experiencia`
- `Core Web Vitals`, se estiver disponivel

Se houver erro, normalmente sera um destes:

- pagina bloqueada por `robots.txt`
- redirecionamento incorreto
- erro `5xx`
- certificado SSL com problema
- pagina com canonical errado

## Passo 7. Melhorar o titulo e a descricao

O Google costuma usar:

- `title`
- `description`
- conteudo real da pagina

Boas praticas:

- titulo claro com nome e especialidade
- descricao natural, sem exagero de palavras-chave
- H1 principal coerente com o assunto da pagina

Exemplo bom:

```text
Dra. Carla Campos | Medica Hematologista e Transplante de Medula Ossea
```

## Passo 8. Trabalhar o SEO local

Como e um servico medico, SEO local faz muita diferenca.

Crie ou atualize o `Perfil da Empresa no Google`:

1. acesse [Google Business Profile](https://www.google.com/business/)
2. cadastre o consultorio ou local de atendimento
3. preencha nome, telefone, categoria, horario, endereco e site
4. adicione fotos reais
5. confirme verificacao da empresa

Isso ajuda o nome aparecer melhor em buscas por:

- `hematologista em [cidade]`
- `medica hematologista [cidade]`

## Passo 9. Conseguir sinais de confianca

O Google tende a confiar mais quando existem sinais consistentes na web.

Mantenha igual em todos os lugares:

- nome profissional
- telefone
- endereco
- link do site

E cadastre onde fizer sentido:

- redes sociais oficiais
- doctoralia, se usar
- perfil profissional institucional
- associacoes ou paginas medicas relevantes

## Passo 10. Validar a imagem do compartilhamento

Para testar a imagem que aparece em compartilhamentos:

1. abra [OpenGraph.xyz](https://www.opengraph.xyz/) ou [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
2. cole a URL do site
3. confira se a imagem aparece corretamente

Observacao:

- `WhatsApp` costuma usar cache
- as vezes demora para atualizar depois do deploy

## Passo 11. Entender o que aparece em cada lugar

### WhatsApp e redes sociais

Usam:

- `Open Graph`
- imagem de compartilhamento
- titulo e descricao da pagina

### Google busca

Usa:

- `title`
- `description`
- conteudo da pagina
- `robots`
- `sitemap`
- dados estruturados
- autoridade e confianca do dominio

### Icone pequeno ao lado do nome do site

Isso normalmente vem do:

- `favicon`

Neste projeto, ele esta em:

- `src/app/icon.svg`

## Passo 12. Tempo esperado

Mesmo com tudo certo, o Google pode levar:

- algumas horas
- alguns dias
- em casos novos, ate algumas semanas

Solicitar indexacao ajuda, mas nao existe garantia de exibicao imediata.

## Checklist rapido

Use esta lista:

- site abre em `https`
- dominio principal funcionando
- certificado SSL valido
- `robots.txt` acessivel
- `sitemap.xml` acessivel
- propriedade validada no Search Console
- sitemap enviado
- URL principal enviada para indexacao
- favicon funcionando
- titulo e descricao claros
- perfil da empresa configurado

## Comandos uteis no servidor

Depois de um novo deploy, voce pode testar assim:

```bash
curl -I https://carlahematologista.com.br
curl https://carlahematologista.com.br/robots.txt
curl https://carlahematologista.com.br/sitemap.xml
```

Se quiser testar de dentro do proprio VPS:

```bash
curl -I http://127.0.0.1:3000
nginx -t
systemctl status nginx
pm2 status
```

## Observacao final

Para este tipo de site, o que mais ajuda a aparecer no Google e a soma de:

- site tecnico correto
- indexacao via Search Console
- dados estruturados
- SEO local
- conteudo confiavel e claro

Se quiser, o proximo passo pode ser criar uma pagina especifica de:

- `sobre`
- `doencas tratadas`
- `transplante de medula ossea`
- `contato`

Isso costuma melhorar bastante a indexacao organica porque aumenta a quantidade de paginas relevantes para pesquisa.
