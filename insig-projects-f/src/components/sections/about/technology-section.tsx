"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Brain, Shield, Cloud, Zap } from "lucide-react"

const technologies = [
  {
    icon: Code,
    title: "Frontend Moderno",
    description: "React 19, Next.js 15, TypeScript y Tailwind CSS para una experiencia de usuario excepcional.",
    technologies: ["React 19", "Next.js 15", "TypeScript", "Tailwind CSS"],
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    icon: Database,
    title: "Backend Escalable",
    description: "Node.js con Prisma ORM, PostgreSQL y arquitectura de microservicios para máximo rendimiento.",
    technologies: ["Node.js", "Prisma", "PostgreSQL", "Docker"],
    color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  },
  {
    icon: Brain,
    title: "Inteligencia Artificial",
    description: "Modelos de ML personalizados y APIs de OpenAI para generar insights inteligentes.",
    technologies: ["Python", "TensorFlow", "OpenAI API", "Scikit-learn"],
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  },
  {
    icon: Shield,
    title: "Seguridad Avanzada",
    description: "Encriptación end-to-end, autenticación multi-factor y cumplimiento GDPR.",
    technologies: ["JWT", "OAuth 2.0", "AES-256", "HTTPS"],
    color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  },
  {
    icon: Cloud,
    title: "Infraestructura Cloud",
    description: "Desplegado en AWS con CDN global, auto-scaling y backup automático.",
    technologies: ["AWS", "CloudFront", "RDS", "S3"],
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  },
  {
    icon: Zap,
    title: "Performance Optimizada",
    description: "Caching inteligente, lazy loading y optimizaciones que garantizan velocidad.",
    technologies: ["Redis", "CDN", "Lazy Loading", "Code Splitting"],
    color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
]

export function TechnologySection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
            Tecnología de Vanguardia
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Utilizamos las mejores herramientas y tecnologías para ofrecerte una plataforma robusta, segura y escalable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => {
            const Icon = tech.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              >
                <CardHeader>
                  <div className={`rounded-lg p-3 w-fit ${tech.color} mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 dark:text-white">{tech.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{tech.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {tech.technologies.map((technology, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="outline"
                        className="text-xs border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        {technology}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
