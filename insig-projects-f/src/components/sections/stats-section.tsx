"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, FolderOpen, Clock, TrendingUp } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Proyectos Analizados",
    description: "Exitosos y fallidos documentados",
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: FolderOpen,
    value: "85%",
    label: "Mejora en Éxito",
    description: "Tras aplicar insights de IA",
    color: "text-green-600 dark:text-green-400",
  },
  {
    icon: Clock,
    value: "40%",
    label: "Reducción de Tiempo",
    description: "En planificación de proyectos",
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    icon: TrendingUp,
    value: "1,200+",
    label: "Horas de Aprendizaje",
    description: "Convertidas en conocimiento",
    color: "text-orange-600 dark:text-orange-400",
  },
]

export function StatsSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Resultados que Hablan por Sí Solos
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Miles de equipos confían en nuestra plataforma para gestionar sus proyectos más importantes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="text-center border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-3">
                      <Icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{stat.description}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
