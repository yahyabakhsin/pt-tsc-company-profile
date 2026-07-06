import { MetadataRoute } from "next";

/**
 * Standard Next.js Web App Manifest file generation
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PT Tirta Surya Cipta",
    short_name: "PT TSC",
    description: "Industrial Automation & Integration Specialist in PLC, HMI, and SCADA Systems",
    start_url: "/",
    display: "standalone",
    background_color: "#080a0f",
    theme_color: "#ff6b00",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
