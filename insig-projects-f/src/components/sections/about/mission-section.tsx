"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Target, Eye, Heart } from "lucide-react"

export function MissionSection() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
            Nuestra Razón de Ser
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Cada decisión que tomamos está guiada por nuestra misión de democratizar el aprendizaje organizacional
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Misión */}
          <Card className="text-center border-gray-200 dark:border-gray-700 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10">
            <CardContent className="pt-8 pb-8">
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-4">
                  <Target className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Misión</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Empoderar a los equipos para que conviertan cada proyecto en una oportunidad de aprendizaje, utilizando
                inteligencia artificial para identificar patrones y generar insights accionables.
              </p>
            </CardContent>
          </Card>

          {/* Visión */}
          <Card className="text-center border-gray-200 dark:border-gray-700 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10">
            <CardContent className="pt-8 pb-8">
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-4">
                  <Eye className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Visión</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Ser la plataforma líder mundial en gestión del conocimiento de proyectos, donde cada experiencia se
                transforma en sabiduría colectiva para el éxito futuro.
              </p>
            </CardContent>
          </Card>

          {/* Valores */}
          <Card className="text-center border-gray-200 dark:border-gray-700 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10">
            <CardContent className="pt-8 pb-8">
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-4">
                  <Heart className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Valores</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Transparencia en los fracasos, celebración de los éxitos, aprendizaje continuo y la creencia de que cada
                error es una oportunidad de crecimiento.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
