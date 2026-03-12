"use client";

import { motion } from "framer-motion";
import {
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import styles from "./Contact.module.css";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const channels = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    info: "Agendamento e atendimento",
    detail: "(41) 3122-9301",
    href: "https://wa.me/554131229301?text=Ol%C3%A1%2C+gostaria+de+agendar+uma+consulta+com+a+Dra.+Carla+Campos.",
  },
  {
    icon: Mail,
    title: "E-mail",
    info: "Dúvidas e informações",
    detail: "carla.hemato@gmail.com",
    href: "mailto:carla.hemato@gmail.com",
  },
  {
    icon: MapPin,
    title: "Consultório",
    info: "CIONC — Centro Integrado de Oncologia de Curitiba",
    detail: "(41) 3024-2421",
    href: "tel:+554130242421",
  },
  {
    icon: Clock,
    title: "Horários",
    info: "Atendimento com hora marcada",
    detail: "Segunda a sexta",
    href: "https://wa.me/554131229301?text=Ol%C3%A1%2C+gostaria+de+agendar+uma+consulta+com+a+Dra.+Carla+Campos.",
  },
];

export function Contact() {
  return (
    <section className={styles.contact} id="contato">
      <div className={styles.container}>
        <div className={styles.layout}>
          <motion.div
            className={styles.info}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.label}>Contato</span>
            <h2>
              Agende sua consulta em hematologia
            </h2>
            <p>
              Entre em contato para agendar uma consulta ou esclarecer
              dúvidas. O atendimento é realizado com hora marcada,
              garantindo atenção individualizada a cada paciente.
            </p>
            <a href="https://wa.me/554131229301?text=Ol%C3%A1%2C+gostaria+de+agendar+uma+consulta+com+a+Dra.+Carla+Campos." target="_blank" rel="noopener noreferrer" className={styles.mainCta}>
              Solicitar atendimento
              <ArrowRight size={16} />
            </a>
          </motion.div>

          <div className={styles.channels}>
            {channels.map((channel, i) => (
              <motion.article
                key={channel.title}
                className={styles.channelCard}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className={styles.channelIcon}>
                  <channel.icon size={20} />
                </div>
                <div className={styles.channelContent}>
                  <strong>{channel.title}</strong>
                  <span className={styles.channelInfo}>{channel.info}</span>
                  <a href={channel.href} target="_blank" rel="noopener noreferrer" className={styles.channelDetail}>
                    {channel.detail}
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
