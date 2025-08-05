"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-white/10 p-3">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
            ¿Listo para Convertir tus Proyectos en Aprendizaje?
          </h2>

          <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-10">
            Únete a equipos que ya están documentando sus proyectos y obteniendo insights valiosos. Cada proyecto,
            exitoso o fallido, es una oportunidad de crecimiento.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
              <Link href="/users">
                Comenzar a Documentar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 bg-transparent">
              Ver Demo de IA
            </Button>
          </div>

          <p className="text-sm text-indigo-200 mt-6">
            Sin costo inicial • Análisis IA incluido • Soporte especializado
          </p>
        </div>
      </div>
    </section>
  )
}
