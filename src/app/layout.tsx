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
  metadataBase: new URL("https://carlahematologista.com.br"),
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
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title:
      "Dra. Carla Campos | Médica Hematologista e Transplante de Medula Óssea",
    description:
      "Atendimento especializado em hematologia e transplante de medula óssea com cuidado individualizado e comunicação clara.",
    url: "https://carlahematologista.com.br",
    type: "website",
    locale: "pt_BR",
    siteName: "Dra. Carla Campos",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Dra. Carla Campos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Dra. Carla Campos | Médica Hematologista e Transplante de Medula Óssea",
    description:
      "Atendimento especializado em hematologia e transplante de medula óssea.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
