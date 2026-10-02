import { Metadata } from "next";
import HomePageClient from "@/components/pages/HomePageClient";

export const metadata: Metadata = {
  title: "Desert Horizon | Luxury Desert Camp & Safari in Jaisalmer",
  description: "Experience the ultimate luxury in the heart of the Thar Desert. Book premium Swiss tents, thrilling dune safaris, and unforgettable cultural nights under the stars in Jaisalmer.",
};

export default function Home() {
  return <HomePageClient />;
}
