import { CheckCircle, XCircle, Edit, Trash2, Calendar, Clock, Users } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { ProjectItemRs } from "@/lib/projects/project"

interface ProjectCardProps {
  project: ProjectItemRs
  onEdit: (project: ProjectItemRs) => void
  onDelete: (id: string) => void
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const statusConfig = {
    SUCCESS: {
      icon: CheckCircle,
      color: "bg-green-100 text-green-700 border-green-200",
      label: "Exitoso",
    },
    FAILURE: {
      icon: XCircle,
      color: "bg-red-100 text-red-700 border-red-200",
      label: "Fallido",
    },
  }

  const StatusIcon = statusConfig[project.status].icon

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-2 flex-1 min-w-0">
            <CardTitle className="text-base sm:text-lg text-gray-900 dark:text-white line-clamp-1 pr-2">
              {project.title}
            </CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <StatusIcon className="h-4 w-4 flex-shrink-0" />
              <Badge className={`${statusConfig[project.status].color} text-xs sm:text-sm`}>
                {statusConfig[project.status].label}
              </Badge>
            </div>
          </div>
          
          {/* Botones: Siempre visibles en móvil, hover en desktop */}
          <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(project)}
              className="text-blue-500 hover:text-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/20 h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(project.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20 h-8 w-8 p-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-3">
        {/* Grid responsivo - 2 columnas en móvil, se mantiene en desktop */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-1 sm:gap-2 text-blue-600 dark:text-blue-400">
            <Calendar className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">
              {new Date(project.startDate).toLocaleDateString("es-ES", {
                day: '2-digit',
                month: 'short'
              })}
            </span>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2 text-blue-600 dark:text-blue-400">
            <Clock className="h-3 w-3 flex-shrink-0" />
            <span>{project.timeSpentHours}h</span>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2 text-blue-600 dark:text-blue-400">
            <Users className="h-3 w-3 flex-shrink-0" />
            <span>{project.teamSize}p</span>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2 text-blue-600 dark:text-blue-400">
            <Calendar className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">
              {new Date(project.endDate).toLocaleDateString("es-ES", {
                day: '2-digit',
                month: 'short'
              })}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {/* Tech Stack - Versión móvil (máximo 2) */}
          <div className="flex flex-wrap gap-1 sm:hidden">
            {project.techStack.slice(0, 2).map((tech, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5"
              >
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 2 && (
              <Badge 
                variant="outline" 
                className="text-xs border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5"
              >
                +{project.techStack.length - 2}
              </Badge>
            )}
          </div>

          {/* Tech Stack - Versión desktop (máximo 3) */}
          <div className="hidden sm:flex flex-wrap gap-1">
            {project.techStack.slice(0, 3).map((tech, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5"
              >
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 3 && (
              <Badge 
                variant="outline" 
                className="text-xs border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5"
              >
                +{project.techStack.length - 3}
              </Badge>
            )}
          </div>

          {/* Descripción más compacta en móvil */}
          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 line-clamp-2 leading-relaxed">
            {project.reason}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
