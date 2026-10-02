import PackagesClient from "@/components/pages/PackagesClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tour Packages | Desert Horizon Jaisalmer",
  description: "Explore our curated Rajasthan and Jaisalmer tour packages. Experience the golden city with our premium itineraries.",
};

export default function PackagesPage() {
  return <PackagesClient />;
}
