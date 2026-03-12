"use client";

import { motion } from "framer-motion";
import {
  Microscope,
  HeartPulse,
  Syringe,
  Stethoscope,
  ShieldCheck,
  Activity,
  Search,
  Pill,
  Ribbon,
  Droplets,
} from "lucide-react";
import styles from "./Expertise.module.css";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const areas = [
  {
    icon: Microscope,
    title: "Hematologia",
    description:
      "Investigação, diagnóstico e acompanhamento de alterações hematológicas. Análise detalhada do hemograma e condução de exames complementares com olhar especializado.",
  },
  {
    icon: HeartPulse,
    title: "Transplante de medula óssea",
    description:
      "Avaliação, preparo e seguimento clínico em transplante de medula óssea. Comunicação clara em cada etapa, com foco em segurança e cuidado contínuo do paciente.",
  },
  {
    icon: Syringe,
    title: "Doenças do sangue",
    description:
      "Acompanhamento especializado de anemias, leucemias, linfomas, mieloma múltiplo e outras condições hematológicas que exigem atenção e tratamento diferenciado.",
  },
];

const topics = [
  { icon: Search, text: "Investigação de alterações no hemograma" },
  { icon: Droplets, text: "Anemias e outras doenças do sangue" },
  { icon: Ribbon, text: "Leucemias e linfomas" },
  { icon: Pill, text: "Mieloma múltiplo" },
  { icon: Stethoscope, text: "Avaliação pré-transplante de medula óssea" },
  { icon: ShieldCheck, text: "Acompanhamento pós-transplante" },
  { icon: Activity, text: "Distúrbios de coagulação" },
  { icon: HeartPulse, text: "Plaquetopenias e pancitopenia" },
];

export function Expertise() {
  return (
    <section className={styles.expertise} id="atuacao">
      <div className={styles.container}>
        <motion.div
          className={styles.heading}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>Áreas de atuação</span>
          <h2>
            Atendimento especializado com clareza, profundidade e excelência
          </h2>
        </motion.div>

        <div className={styles.cards}>
          {areas.map((area, i) => (
            <motion.article
              key={area.title}
              className={styles.card}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeUp}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <div className={styles.cardIcon}>
                <area.icon size={24} />
              </div>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
              <div className={styles.cardAccent} />
            </motion.article>
          ))}
        </div>

        <motion.div
          className={styles.topicSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className={styles.topicTitle}>Principais temas atendidos</h3>
          <div className={styles.topicGrid}>
            {topics.map((topic, i) => (
              <motion.div
                key={topic.text}
                className={styles.topic}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeUp}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className={styles.topicIcon}>
                  <topic.icon size={20} />
                </div>
                <span>{topic.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
