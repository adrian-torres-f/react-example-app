"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Lightbulb } from "lucide-react"
import Link from "next/link"

export function AboutHeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-purple-900/20">
      <div className="container mx-auto px-4 py-24 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-8">
            <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 p-4">
              <Lightbulb className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl mb-6">
            Transformando{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Experiencias
            </span>{" "}
            en Conocimiento
          </h1>

          <p className="text-xl leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
            En InsigProjects creemos que cada proyecto, exitoso o fallido, contiene lecciones valiosas. Nuestra misión es
            ayudar a los equipos a capturar, analizar y aprender de cada experiencia para construir un futuro más
            exitoso.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
              <Link href="/users">
                Comenzar tu Viaje
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              Conocer al Equipo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
