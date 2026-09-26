import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nilai Logistics & Trans",
    short_name: "Nilai Logistics",
    description: "Cargo planning across Peninsular Malaysia, Sabah and Sarawak.",
    start_url: "/",
    display: "standalone",
    background_color: "#030712",
    theme_color: "#06b6d4",
    lang: "en-MY",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
