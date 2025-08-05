import type { Metadata } from "next"
import { CTASection } from "@/components/sections/cta-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { HeroSection } from "@/components/sections/hero-section"
import { StatsSection } from "@/components/sections/stats-section"

export const metadata: Metadata = {
  title: "Inicio | InsigProjects",
  description: "Registra, analiza y aprende de cada proyecto. Obtén insights inteligentes para mejorar tu próximo proyecto y maximizar el éxito de tu equipo.",
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </>
  )
}
