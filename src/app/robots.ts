import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: "https://fluxoclinicas.online/sitemap.xml",
    host: "https://fluxoclinicas.online",
  };
}
