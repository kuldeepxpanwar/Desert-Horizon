import { Metadata } from "next";
import LuxuryCampClient from "@/components/pages/LuxuryCampClient";

export const metadata: Metadata = {
  title: "Luxury Tents & Glamping in Jaisalmer | Desert Horizon",
  description: "Stay in our premium Swiss Tents in Jaisalmer. Enjoy modern amenities, majestic dune views, and royal Rajasthani hospitality in the heart of the desert.",
};

export default function LuxuryCampPage() {
  return <LuxuryCampClient />;
}
