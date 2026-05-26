import type { Metadata } from "next";

import { Hero } from "@/components/modules/Home/Hero";
import Specialties from "@/components/modules/Home/Specialties";
import Steps from "@/components/modules/Home/Steps";
import Testimonials from "@/components/modules/Home/Testimonials";
import TopRatedDoctors from "@/components/modules/Home/TopRatedDoctor";

export const metadata: Metadata = {
  title: "AI-Powered Healthcare - Find Your Perfect Doctor",
  description:
    "Discover top-rated doctors tailored to your needs with an AI-powered healthcare platform",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Specialties />
      <TopRatedDoctors />
      <Steps />
      <Testimonials />
    </main>
  );
}