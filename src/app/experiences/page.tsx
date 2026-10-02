import { Metadata } from "next";
import ExperiencesClient from "@/components/pages/ExperiencesClient";

export const metadata: Metadata = {
  title: "Desert Safari & Experiences | Desert Horizon Jaisalmer",
  description: "Discover thrilling Quad Biking, authentic Jeep Safaris, Kalbelia Folk Dance, and magical Sunset Dunes. Curate your perfect adventure in the Thar Desert.",
};

export default function ExperiencesPage() {
  return <ExperiencesClient />;
}
