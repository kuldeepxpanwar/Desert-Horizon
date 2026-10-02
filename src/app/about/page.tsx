import { Metadata } from "next";
import AboutClient from "@/components/pages/AboutClient";

export const metadata: Metadata = {
  title: "About Us | Desert Horizon Luxury Camp Jaisalmer",
  description: "Learn about the legacy of Desert Horizon. We are committed to providing an authentic, premium Rajasthani hospitality experience in the majestic Thar Desert.",
};

export default function AboutPage() {
  return <AboutClient />;
}
