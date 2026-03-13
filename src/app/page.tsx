import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Expertise } from "@/components/Expertise";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  const physicianSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: "Dra. Carla Campos",
    medicalSpecialty: ["Hematology"],
    description:
      "Médica hematologista com atuação em hematologia e transplante de medula óssea. Atendimento humanizado e individualizado.",
    image: "/assets/photos/Foto Carla atualizada.png",
    url: "/",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }}
      />
      <Header />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
