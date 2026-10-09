
import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://justmelts.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Just Melts | Custom Cakes & Eggless Bakery",
    template: "%s | Just Melts",
  },

  description:
    "Order handcrafted eggless cakes, bento cakes, brownies, cupcakes and custom celebration cakes from Just Melts. Explore our menu and order your favourites online.",

  applicationName: "Just Melts",

  keywords: [
    "Just Melts",
    "eggless cakes",
    "custom cakes",
    "birthday cakes",
    "bento cakes",
    "engagement cakes",
    "designer cakes",
    "brownies",
    "cupcakes",
    "home bakery",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Just Melts | Custom Cakes & Eggless Bakery",
    description:
      "Celebrate every occasion with handcrafted cakes, bento cakes and freshly baked treats from Just Melts.",
    url: siteUrl,
    siteName: "Just Melts",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Handcrafted celebration cakes by Just Melts",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Just Melts | Custom Cakes & Eggless Bakery",
    description:
      "Handcrafted cakes and freshly baked treats for your special moments.",
    images: ["/images/og-image.jpg"],
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>

      <body className="bg-[#F7F7F5] text-[#1C1917] font-sans antialiased selection:bg-[#F6ECEA] selection:text-[#1C1917] min-h-screen">
        {children}
      </body>
    </html>
  );
}