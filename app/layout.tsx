import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const title = "Nilai Logistics & Trans Sdn Bhd | Peninsular Malaysia ↔ Sabah & Sarawak";
const description =
  "Freight forwarding and cargo planning across Peninsular Malaysia, Sabah and Sarawak, including air freight, sea freight, commercial cargo, e-commerce consolidation and household relocation.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Nilai Logistics & Trans",
  },
  description,
  keywords: [
    "Nilai Logistics",
    "Nilai freight forwarding",
    "Sabah Sarawak logistics",
    "East Malaysia cargo",
    "Peninsular Malaysia cargo",
    "air freight Malaysia",
    "sea freight Malaysia",
    "e-commerce cargo Malaysia",
    "commercial freight Malaysia",
    "household relocation Malaysia",
  ],
  alternates: {
    canonical: "/",
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
  openGraph: {
    title: "Nilai Logistics & Trans Sdn Bhd",
    description:
      "Freight forwarding and cargo planning between Peninsular Malaysia, Sabah and Sarawak.",
    url: siteUrl,
    siteName: "Nilai Logistics & Trans Sdn Bhd",
    locale: "en_MY",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Nilai Logistics & Trans — Peninsular Malaysia to East Malaysia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nilai Logistics & Trans Sdn Bhd",
    description:
      "Freight forwarding and cargo planning across Peninsular Malaysia, Sabah and Sarawak.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Nilai Logistics & Trans Sdn Bhd",
  legalName: "NILAI LOGISTICS & TRANS SDN BHD",
  url: siteUrl,
  description,
  telephone: "+60387789008",
  email: "nilai.logistics@gmail.com",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+60387789008",
      contactType: "customer service",
      areaServed: "MY",
      availableLanguage: ["en", "ms"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+60132323305",
      contactType: "sales",
      areaServed: "MY",
      availableLanguage: ["en", "ms"],
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "PT12899-A, Tingkat Satu, Jalan BBN 1/7F, Putra Indah, Putra Nilai",
    postalCode: "71800",
    addressLocality: "Nilai",
    addressRegion: "Negeri Sembilan",
    addressCountry: "MY",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Peninsular Malaysia" },
    { "@type": "AdministrativeArea", name: "Sabah" },
    { "@type": "AdministrativeArea", name: "Sarawak" },
  ],
  sameAs: [
    "https://www.facebook.com/nilai.logistics/",
    "https://www.tiktok.com/@nilailogistics",
    "https://www.youtube.com/@nilailogisticstranssdnbhd5356",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-MY">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-slate-950 focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
