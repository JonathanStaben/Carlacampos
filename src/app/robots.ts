import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://carlahematologista.com.br/sitemap.xml",
    host: "https://carlahematologista.com.br",
  };
}
