import { Metadata } from "next";
import ContactClient from "@/components/pages/ContactClient";

export const metadata: Metadata = {
  title: "Contact Us & Booking | Desert Horizon Jaisalmer",
  description: "Get in touch with Desert Horizon to book your luxury stay and desert safari in Jaisalmer. Easy bookings via WhatsApp, phone, or email.",
};

export default function ContactPage() {
  return <ContactClient />;
}
