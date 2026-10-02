import TaxiClient from "@/components/pages/TaxiClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Taxi Services | Desert Horizon Jaisalmer",
  description: "Premium taxi and cab services in Jaisalmer. Local sightseeing, Sam Sand Dunes drop, and outstation cabs.",
};

export default function TaxiPage() {
  return <TaxiClient />;
}
