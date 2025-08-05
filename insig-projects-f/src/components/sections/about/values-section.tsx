"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Zap, Shield, Globe, Rocket } from "lucide-react"

const values = [
  {
    icon: BookOpen,
    title: "Aprendizaje Continuo",
    description:
      "Creemos que cada proyecto, sin importar su resultado, contiene lecciones valiosas que pueden transformar el futuro.",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    badge: "Fundamental",
  },
  {
    icon: Users,
    title: "Colaboración Transparente",
    description:
      "Fomentamos un ambiente donde los equipos pueden compartir abiertamente tanto éxitos como fracasos para el beneficio colectivo.",
    color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    badge: "Esencial",
  },
  {
    icon: Zap,
    title: "Innovación Responsable",
    description:
      "Utilizamos tecnología de vanguardia, especialmente IA, de manera ética y responsable para generar insights genuinos.",
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    badge: "Innovador",
  },
  {
    icon: Shield,
    title: "Confianza y Seguridad",
    description:
      "Protegemos la información de nuestros usuarios con los más altos estándares de seguridad y privacidad.",
    color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    badge: "Crítico",
  },
  {
    icon: Globe,
    title: "Impacto Global",
    description:
      "Aspiramos a democratizar el acceso al conocimiento organizacional, sin importar el tamaño o ubicación del equipo.",
    color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
    badge: "Ambicioso",
  },
  {
    icon: Rocket,
    title: "Excelencia Operacional",
    description:
      "Nos comprometemos a entregar una experiencia excepcional, con herramientas intuitivas y soporte de clase mundial.",
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    badge: "Calidad",
  },
]

export function ValuesSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
            Nuestros Valores Fundamentales
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Los principios que guían cada decisión y definen nuestra cultura organizacional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`rounded-lg p-3 ${value.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {value.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-gray-900 dark:text-white">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
