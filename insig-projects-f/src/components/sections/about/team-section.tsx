"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Twitter } from "lucide-react"

const team = [
  {
    name: "Ana García",
    role: "CEO & Fundadora",
    bio: "Ex-directora de proyectos en Google. Apasionada por convertir datos en decisiones inteligentes.",
    image: "https://i.pinimg.com/736x/27/39/72/273972c2bb8c4fe16e176dff31b9f89a.jpg",
    skills: ["Liderazgo", "Estrategia", "IA"],
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Carlos Rodríguez",
    role: "CTO",
    bio: "Ingeniero de software con 15 años de experiencia. Especialista en arquitecturas escalables y ML.",
    image: "/images/avatars/carlos-rodríguez.jpg?height=300&width=300",
    skills: ["React", "Node.js", "Machine Learning"],
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "María López",
    role: "Head of Product",
    bio: "Diseñadora UX con background en psicología. Obsesionada con crear experiencias que realmente importen.",
    image: "https://i.pinimg.com/736x/a8/0a/cf/a80acf16d26543b5192e88dc6d862e0e.jpg",
    skills: ["UX Design", "Research", "Product Strategy"],
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Diego Martínez",
    role: "Lead AI Engineer",
    bio: "PhD en Machine Learning. Especialista en NLP y análisis predictivo para insights de proyectos.",
    image: "/images/avatars/diego-martinez.jpg",
    skills: ["Python", "TensorFlow", "NLP"],
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
]

export function TeamSection() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
            Conoce a Nuestro Equipo
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Un grupo diverso de profesionales apasionados por transformar cómo los equipos aprenden y crecen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="relative mb-6">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={96}  // 24 * 4 = 96px (w-24)
                      height={96} // 24 * 4 = 96px (h-24)
                      className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-gray-100 dark:border-gray-700"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">{member.bio}</p>

                  <div className="flex flex-wrap gap-1 justify-center mb-4">
                    {member.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-center space-x-3">
                    <a
                      href={member.social.linkedin}
                      className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a
                      href={member.social.github}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
