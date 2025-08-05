"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, FolderOpen, BarChart3, Clock, Search, Target } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Gestión de Usuarios",
    description:
      "Administra tu equipo y asigna responsabilidades. Rastrea la participación de cada miembro en los proyectos.",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    badge: "Esencial",
  },
  {
    icon: FolderOpen,
    title: "Registro Detallado",
    description:
      "Documenta cada proyecto con información completa: objetivos, tecnologías, tiempo invertido y resultados obtenidos.",
    color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    badge: "Popular",
  },
  {
    icon: BarChart3,
    title: "Análisis con IA",
    description:
      "Obtén insights inteligentes sobre patrones de éxito y fracaso. Recibe recomendaciones personalizadas para mejorar.",
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    badge: "IA",
  },
  {
    icon: Clock,
    title: "Seguimiento Temporal",
    description:
      "Registra el tiempo real invertido en cada proyecto. Identifica cuellos de botella y optimiza la planificación futura.",
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    badge: "Útil",
  },
  {
    icon: Search,
    title: "Búsqueda Inteligente",
    description:
      "Encuentra rápidamente proyectos similares, tecnologías utilizadas o patrones específicos en tu historial.",
    color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
    badge: "Rápido",
  },
  {
    icon: Target,
    title: "Aprendizajes Documentados",
    description:
      "Captura lecciones aprendidas de cada proyecto. Construye una base de conocimiento para decisiones futuras.",
    color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    badge: "Clave",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Características Principales
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Descubre todas las herramientas que necesitas para gestionar tus proyectos de manera eficiente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-700"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`rounded-lg p-3 ${feature.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-gray-900 dark:text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
