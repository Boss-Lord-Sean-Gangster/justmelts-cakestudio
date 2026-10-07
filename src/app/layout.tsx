import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "JUST MELTS | Haute Pâtisserie & The Blush Engagement Cake",
  description:
    "An Apple-grade scrollytelling experience revealing the three-tier Blush Engagement Cake by Just Melts. Handcrafted tiers, delicate buttercream, sugar pearls, and fresh florals.",
  keywords: ["engagement cake", "luxury wedding cake", "bespoke cake atelier", "just melts", "custom wedding bakery"],
  openGraph: {
    title: "JUST MELTS | The Blush Engagement Cake",
    description: "Where every layer tells your love story. A three-tier celebration in blush and cream.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#F7F7F5] text-[#1C1917] font-sans antialiased selection:bg-[#F6ECEA] selection:text-[#1C1917] min-h-screen">
        {children}
      </body>
    </html>
  );
}

