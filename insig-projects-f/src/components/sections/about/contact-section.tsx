"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Mail, MessageCircle, Calendar, MapPin } from "lucide-react"

export function ContactSection() {
  return (
    <section className="py-24 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
            ¿Listo para Comenzar tu Transformación?
          </h2>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            Únete a cientos de equipos que ya están convirtiendo sus proyectos en aprendizaje valioso
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* CTA Principal */}
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-white/20 p-4">
                  <ArrowRight className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Comienza Gratis Hoy</h3>
              <p className="text-indigo-100 mb-6 leading-relaxed">
                Registra tu primer proyecto y descubre cómo ProjectHub puede transformar la manera en que tu equipo
                aprende y crece.
              </p>
              <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 w-full">
                <Link href="/users">
                  Crear mi Cuenta Gratis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Información de Contacto */}
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Contáctanos</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-white/20 p-3">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-indigo-100">hola@projecthub.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-white/20 p-3">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Chat en Vivo</p>
                    <p className="text-indigo-100">Disponible 24/7</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-white/20 p-3">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Demo Personalizada</p>
                    <p className="text-indigo-100">Agenda una llamada</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-white/20 p-3">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Ubicación</p>
                    <p className="text-indigo-100">Madrid, España</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-indigo-200 text-sm">
            ¿Preguntas? Estamos aquí para ayudarte • Respuesta en menos de 24 horas • Soporte en español
          </p>
        </div>
      </div>
    </section>
  )
}
