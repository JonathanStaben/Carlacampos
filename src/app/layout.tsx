import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const fallbackSans = Manrope({
  variable: "--font-fallback-sans",
  subsets: ["latin"],
  display: "swap",
});

const fallbackSerif = Cormorant_Garamond({
  variable: "--font-fallback-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "Dra. Carla Campos | Médica Hematologista e Transplante de Medula Óssea",
    template: "%s | Dra. Carla Campos",
  },
  description:
    "Dra. Carla Campos é médica hematologista especializada em transplante de medula óssea. Atendimento humanizado em hematologia, doenças do sangue e acompanhamento individualizado.",
  keywords: [
    "hematologista",
    "hematologia",
    "médica hematologista",
    "transplante de medula óssea",
    "doenças do sangue",
    "atendimento em hematologia",
    "consulta hematologia",
    "Dra. Carla Campos",
  ],
  openGraph: {
    title:
      "Dra. Carla Campos | Médica Hematologista e Transplante de Medula Óssea",
    description:
      "Atendimento especializado em hematologia e transplante de medula óssea com cuidado individualizado e comunicação clara.",
    type: "website",
    locale: "pt_BR",
    siteName: "Dra. Carla Campos",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Dra. Carla Campos | Médica Hematologista e Transplante de Medula Óssea",
    description:
      "Atendimento especializado em hematologia e transplante de medula óssea.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${fallbackSans.variable} ${fallbackSerif.variable}`}>
        {children}
      </body>
    </html>
  );
}
