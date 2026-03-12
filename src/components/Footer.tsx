"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./Footer.module.css";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const links = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Atuação", href: "#atuacao" },
  { label: "Contato", href: "#contato" },
];

export function Footer() {
  return (
    <motion.footer
      className={styles.footer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <Image
                src="/assets/logos/Ativo%201.svg"
                alt="Dra. Carla Campos"
                width={200}
                height={60}
                className={styles.logoImg}
              />
            </div>
            <p>
              Médica hematologista e transplantadora de medula óssea.
              Atendimento com excelência, cuidado individualizado e
              comunicação clara.
            </p>
          </div>

          <nav className={styles.nav}>
            <strong>Navegação</strong>
            {links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className={styles.sealCol}>
            <div className={styles.seal}>
              <Image
                src="/assets/logos/Selo%20-%20Carla%20Campos.svg"
                alt="Selo Dra. Carla Campos"
                width={80}
                height={80}
              />
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <span>
            &copy; {new Date().getFullYear()} Dra. Carla Campos. Todos os
            direitos reservados.
          </span>
          <span className={styles.crm}>
            CRM 52358 &middot; RQE 36376
          </span>
        </div>
      </div>
    </motion.footer>
  );
}
