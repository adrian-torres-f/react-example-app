"use client";

import { ProjectCard } from "@/components/projects/project-card"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { deleteProject } from "@/lib/projects/api"
import { ProjectItemRs } from "@/lib/projects/project"
import { getProjectsByUserPaginated, getUserById } from "@/lib/users/api"
import { UserItemRs } from "@/lib/users/user"
import { ArrowLeft, Mail, Calendar, FolderOpen, Plus, ChevronLeft, ChevronRight, Settings } from "lucide-react"
import Link from "next/link";
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"; 
import { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"

export default function UserProjectsPage() {
  const params = useParams()
  const router = useRouter()
  const userId = Number.parseInt(params.id as string)

  const [user, setUser] = useState<UserItemRs | null>(null)
  const [projects, setProjects] = useState<ProjectItemRs[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const loadUserAndProjects = useCallback(async () => {
    setLoading(true)
    try {
      // 1. Verificar que el usuario existe
      const userResponse = await getUserById(userId)
      
      if (userResponse.status === "error" || !userResponse.data) {
        toast.error("Error", {
          description: userResponse.message || "El usuario que buscas no existe."
        })
        router.push("/users")
        return
      }

      // 2. Usuario válido, establecer datos
      setUser(userResponse.data)
      console.log("Datos del usuario:", JSON.stringify(userResponse.data, null, 2))

      // 3. Cargar proyectos
      const projectsResponse = await getProjectsByUserPaginated(userId, currentPage, 6)
      setProjects(projectsResponse.data?.projects ?? [])
      setTotalPages(projectsResponse.data?.totalPages ?? 1)
      console.log("Proyectos del usuario:", JSON.stringify(projectsResponse.data, null, 2))

    } catch (error) {
      // Solo errores de red inesperados llegarían aquí
      console.error("Error inesperado al cargar datos:", error)
      toast.error("Error de conexión", {
        description: "No se pudo conectar con el servidor. Inténtalo de nuevo."
      })
    } finally {
      setLoading(false)
    }
  }, [currentPage, router, userId])

  useEffect(() => {
    loadUserAndProjects()
  }, [loadUserAndProjects])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSettings = () => {
    toast.warning(
      "Función en desarrollo",
      { description: "La configuración del usuario estará disponible pronto." }
    )
  }


  const handleEditProject = (project: ProjectItemRs) => {
    router.push(`/users/${userId}/projects/edit?id=${project.id}`);
    console.log("Editando el proyecto:", project)
  }

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(projectId)
      toast.success(
        "Proyecto eliminado",
        { description: "El proyecto ha sido eliminado exitosamente." }
      )
      loadUserAndProjects()
    } catch (error) {
      toast.error( 
        "Error",
        { description: "No se pudo eliminar el proyecto." }
      )
      console.log("Error al eliminar el proyecto:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-48 mb-6" />
          <Skeleton className="h-32 w-full mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-row justify-between">
            <Button
              variant="ghost"
              onClick={() => router.push('/users')}
              className="mb-4 text-blue-600 hover:text-blue-800 hover:bg-blue-100 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleSettings()}
              className="mb-4 text-blue-600 hover:text-blue-800 hover:bg-blue-100 dark:text-blue-400 dark:hover:text-blue-300"
              >
              <Settings className="h-4 w-4 mr-2" />
              Configurar
            </Button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-sm border border-blue-100 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              {/* Información principal */}
              <div className="space-y-2 flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 dark:text-blue-100 break-words">
                  {user.name}
                </h1>
                
                {/* Email - siempre visible */}
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm sm:text-base">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span className="break-all">{user.email}</span>
                </div>
                
                {/* Fecha de registro - oculta en móviles pequeños */}
                <div className="hidden sm:flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm sm:text-base">
                  <Calendar className="h-4 w-4 flex-shrink-0" />
                  <span>Miembro desde {new Date(user.createdAt).toLocaleDateString("es-ES")}</span>
                </div>
                
                {/* Fecha de registro versión móvil - solo fecha */}
                <div className="flex sm:hidden items-center gap-2 text-blue-600 dark:text-blue-400 text-sm">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">
                    {new Date(user.createdAt).toLocaleDateString("es-ES", { 
                      year: 'numeric', 
                      month: 'short' 
                    })}
                  </span>
                </div>
              </div>
              
              {/* Badge - se adapta al contenedor */}
              <div className="flex sm:block justify-start sm:justify-end">
                <Badge className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700 text-xs sm:text-sm whitespace-nowrap">
                  {projects.length || 0} proyecto{(projects.length || 0) !== 1 ? 's' : ''}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <FolderOpen className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg sm:text-xl font-semibold text-blue-900 dark:text-blue-100">
              Proyectos
            </h2>
          </div>
          
          <Link href={`/users/${userId}/projects/new`}>
            {/* Botón móvil - solo ícono */}
            <Button 
              size="sm"
              className="sm:hidden bg-blue-500 hover:bg-blue-600 text-white h-9 w-9 p-0"
              title="Nuevo Proyecto"
            >
              <Plus className="h-4 w-4" />
            </Button>
            
            {/* Botón desktop - con texto */}
            <Button className="hidden sm:flex bg-blue-500 hover:bg-blue-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Proyecto
            </Button>
          </Link>
        </div>

        {/* Projects Grid */}
        {projects && projects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={handleEditProject}
                  onDelete={handleDeleteProject}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className={
                        page === currentPage
                          ? "bg-blue-500 hover:bg-blue-600 text-white"
                          : "border-blue-200 text-blue-700 hover:bg-blue-50"
                      }
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  Siguiente
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <FolderOpen className="h-16 w-16 text-blue-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-blue-800 mb-2">No hay proyectos registrados</h3>
            <p className="text-blue-600 mb-4">Comienza agregando el primer proyecto de {user.name}</p>
          </div>
        )}
      </div>
    </div>
  )
}
