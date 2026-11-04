import type { MetadataRoute } from "next";

const origin = "https://fluxoclinicas.online";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/identidade-visual", "/politica-de-privacidade"].map((path) => ({
    url: `${origin}${path}`,
  }));
}
