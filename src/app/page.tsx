import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

// Title, description and Open Graph come from the root layout.
// The canonical is set here because the layout no longer sets one for all pages.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomeClient />;
}
