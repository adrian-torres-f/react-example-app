"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, BarChart3, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto px-4 py-24 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 dark:text-gray-300 ring-1 ring-gray-900/10 dark:ring-gray-100/10 hover:ring-gray-900/20 dark:hover:ring-gray-100/20">
              Aprende de cada proyecto, exitoso o fallido.{" "}
              <Link href="/users" className="font-semibold text-indigo-600 dark:text-indigo-400">
                <span className="absolute inset-0" aria-hidden="true" />
                Comenzar ahora <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Registra, Analiza y{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Aprende
            </span>{" "}
            de tus Proyectos
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Documenta cada proyecto con detalles completos: participantes, tiempo invertido, tecnologías y aprendizajes.
            Obtén insights inteligentes para mejorar tu próximo proyecto y maximizar el éxito de tu equipo.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
              <Link href="/users">
                Registrar mi primer proyecto
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              Ver cómo funciona
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="rounded-lg bg-indigo-100 dark:bg-indigo-900/30 p-3 mb-4">
                <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Gestión de Equipos</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                Organiza usuarios y asigna proyectos eficientemente
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="rounded-lg bg-purple-100 dark:bg-purple-900/30 p-3 mb-4">
                <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Análisis Inteligente</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                IA que identifica patrones y sugiere mejoras
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="rounded-lg bg-green-100 dark:bg-green-900/30 p-3 mb-4">
                <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Aprendizaje Continuo</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                Convierte cada experiencia en conocimiento valioso
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
