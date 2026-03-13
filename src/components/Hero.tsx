"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Droplets } from "lucide-react";
import styles from "./Hero.module.css";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className={styles.hero} id="inicio">
      <div className={styles.container}>
        <div className={styles.grid}>
          <motion.div
            className={styles.content}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <span className={styles.badge}>
              <Droplets size={14} />
              Hematologia &middot; Transplante de medula óssea
            </span>

            <h1>
              Cuidado especializado em{" "}
              <em>hematologia</em>
            </h1>

            <p className={styles.subtitle}>
              Médica hematologista e transplantadora de medula óssea, com
              atendimento pautado pela escuta atenta, comunicação clara e
              acompanhamento individualizado.
            </p>

            <div className={styles.actions}>
              <a href="https://wa.me/554131229301?text=Ol%C3%A1%2C+gostaria+de+agendar+uma+consulta+com+a+Dra.+Carla+Campos." target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>
                Agendar consulta
                <ArrowRight size={16} />
              </a>
              <a href="#atuacao" className={styles.secondaryBtn}>
                Áreas de atuação
              </a>
            </div>
          </motion.div>

          <motion.div
            className={styles.visual}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <div className={styles.photoFrame}>
              <div className={styles.photo}>
                <Image
                  src="/assets/photos/Foto Carla atualizada.png"
                  alt="Dra. Carla Campos — Médica Hematologista"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 480px"
                  className={styles.photoImg}
                />
              </div>

              <motion.div
                className={styles.seal}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/assets/logos/Selo%20-%20Carla%20Campos.svg"
                  alt="Selo Dra. Carla Campos"
                  width={72}
                  height={72}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className={styles.bgGradient} aria-hidden="true" />
    </section>
  );
}
