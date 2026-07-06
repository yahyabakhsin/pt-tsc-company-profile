import { MetadataRoute } from "next";

/**
 * Standard Next.js Search Engine crawler configuration (robots.txt generation)
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: "https://www.tirtasuryacipta.com/sitemap.xml",
  };
}
