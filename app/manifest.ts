import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nilai Logistics & Trans",
    short_name: "Nilai Logistics",
    description: "Cargo planning across Peninsular Malaysia, Sabah and Sarawak.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f9fc",
    theme_color: "#07111f",
    lang: "en-MY",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
