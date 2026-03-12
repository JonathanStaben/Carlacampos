"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap, HeartHandshake } from "lucide-react";
import styles from "./About.module.css";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const credentials = [
  {
    icon: GraduationCap,
    title: "Medicina",
    text: "Escola Superior de Ciências Médicas da Santa Casa de Misericórdia de Vitória.",
  },
  {
    icon: Award,
    title: "Hematologia e Hemoterapia",
    text: "Residência pelo Hospital de Clínicas da Universidade Federal do Paraná (UFPR).",
  },
  {
    icon: HeartHandshake,
    title: "Transplante de Medula Óssea",
    text: "Formação pelo Hospital de Clínicas da Universidade Federal do Paraná (UFPR).",
  },
];

export function About() {
  return (
    <section className={styles.about} id="sobre">
      <div className={styles.container}>
        <motion.div
          className={styles.heading}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>Sobre</span>
          <h2>
            Medicina que une conhecimento técnico, sensibilidade e presença
          </h2>
        </motion.div>

        <div className={styles.grid}>
          <motion.div
            className={styles.bio}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p>
              Médica hematologista e transplantadora de medula óssea, a Dra.
              Carla Campos atua na investigação, diagnóstico e acompanhamento
              de doenças do sangue — incluindo leucemias, linfomas, mieloma e
              anemias.
            </p>
            <p>
              Sua prática combina rigor técnico com escuta atenta e comunicação
              clara, construindo uma relação de confiança com cada paciente.
            </p>

            <div className={styles.goldLine} />
          </motion.div>

          <motion.div
            className={styles.quoteCard}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className={styles.quoteMark}>&ldquo;</span>
            <p>
              Cada paciente traz uma história única. Meu compromisso é oferecer
              um atendimento que respeite essa individualidade, com clareza,
              segurança e o cuidado que a hematologia exige.
            </p>
            <strong>Dra. Carla Campos</strong>
            <span className={styles.quoteRole}>
              Hematologia &middot; Transplante de Medula Óssea
            </span>
          </motion.div>
        </div>

        <div className={styles.credentials}>
          {credentials.map((item, i) => (
            <motion.article
              key={item.title}
              className={styles.credentialCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className={styles.credentialIcon}>
                <item.icon size={22} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
