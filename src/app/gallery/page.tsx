import { Metadata } from "next";
import GalleryClient from "@/components/pages/GalleryClient";

export const metadata: Metadata = {
  title: "Photo Gallery | Desert Horizon Jaisalmer",
  description: "Browse our stunning gallery of luxury Swiss Tents, thrilling desert safaris, and magical cultural nights under the stars in Jaisalmer.",
};

export default function GalleryPage() {
  return <GalleryClient />;
}
