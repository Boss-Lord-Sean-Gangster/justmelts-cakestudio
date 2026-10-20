
import type { Metadata } from "next";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, BRAND, OG_IMAGE, siteJsonLd } from "@/lib/seo";

const siteUrl = SITE_URL;
const HOME_TITLE =
  "Just Melts | Eggless Custom Cakes & Bento Cakes in Noida, Delhi NCR";
const HOME_DESCRIPTION =
  "Just Melts is an eggless cake studio in Noida. Order custom cakes, bento cakes, brownies, cupcakes and savouries, delivered across Delhi NCR. Order on WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: HOME_TITLE,
    template: `%s | ${BRAND}`,
  },

  description: HOME_DESCRIPTION,

  applicationName: BRAND,

  // NOTE: no site-wide `alternates.canonical` here. A canonical set in the
  // root layout is inherited by every page that doesn't override it, which
  // made /products declare the homepage as its canonical. Each page now sets
  // its own canonical.

  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/",
    siteName: BRAND,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Just Melts logo beside a red velvet cake",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [OG_IMAGE],
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
    <html lang="en-IN">
      <meta name="google-site-verification" content="Z991BosWg9C7kCWEsCheC07RsnuAqJMIHY7NxFHxESU" />
      <head>
        <JsonLd data={siteJsonLd()} />
      </head>

      <body className="bg-[#F7F7F5] text-[#1C1917] font-sans antialiased selection:bg-[#F6ECEA] selection:text-[#1C1917] min-h-screen">
        {children}
      </body>
    </html>
  );
}