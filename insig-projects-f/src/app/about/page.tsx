import { AboutHeroSection } from "@/components/sections/about/about-hero-section"
import { ContactSection } from "@/components/sections/about/contact-section"
import { MissionSection } from "@/components/sections/about/mission-section"
import { TeamSection } from "@/components/sections/about/team-section"
import { TechnologySection } from "@/components/sections/about/technology-section"
import { ValuesSection } from "@/components/sections/about/values-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Acerca de Nosotros",
  description:
    "Conoce la historia detrás de ProjectHub, nuestra misión de transformar cómo los equipos aprenden de sus proyectos y nuestro compromiso con la innovación.",
}

export default function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <MissionSection />
      <ValuesSection />
      <TeamSection />
      <TechnologySection />
      <ContactSection />
    </>
  )
}