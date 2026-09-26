import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Nilai Logistics & Trans Sdn Bhd | Peninsular Malaysia ↔ Sabah & Sarawak",
  description: "Enterprise cargo, commercial freight, medical equipment logistics and household relocation from Peninsular Malaysia to Sabah and Sarawak.",
  keywords: ["logistics Sabah Sarawak","cargo Sabah","cargo Sarawak","East Malaysia logistics","Nilai logistics","bulk e-commerce shipping Malaysia"],
  openGraph: { title: "Nilai Logistics & Trans", description: "Moving critical cargo across Malaysia with a clearer operating experience.", type: "website" }
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}