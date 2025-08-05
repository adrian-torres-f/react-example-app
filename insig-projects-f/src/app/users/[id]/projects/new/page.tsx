"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, X, Loader2 } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState, useEffect, useCallback, useActionState } from "react"
import { toast } from "sonner"
import { ProjectCreateRq, projectCreateSchema } from "@/lib/projects/project.schema"
import { createProject } from "@/lib/projects/api"

export default function NewProjectPage() {
  const params = useParams()
  const router = useRouter()
  const userId = Number.parseInt(params.id as string)

  // Estados para validación en tiempo real
  const [formData, setFormData] = useState<ProjectCreateRq>({
    title: "",
    status: "SUCCESS",
    startDate: "",
    endDate: "",
    timeSpentHours: 0,
    teamSize: 0,
    techStack: [],
    reason: "",
    learnings: "",
    userId
  })

  // Estados para tech stack
  const [techInput, setTechInput] = useState("")

  // Estados locales separados
  const [serverErrors, setServerErrors] = useState<{ [key: string]: string }>({})
  const [serverMessage, setServerMessage] = useState<string>("")
  const [isSuccess, setIsSuccess] = useState(false)
  
  type FormFields = keyof Omit<ProjectCreateRq, 'userId'>
  
  const [validationErrors, setValidationErrors] = useState<Partial<Record<FormFields, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<FormFields, boolean>>>({})

  // Actualizar el titulo de la pagina
  useEffect(() => {
    document.title = "Nuevo Proyecto | ProjectHub"
  }, [])

  // Server Action para crear el proyecto
  const createProjectAction = async (
    _prevState: unknown, 
    formData: FormData
  ) => {
    try {
      // Limpiar estados anteriores
      setServerErrors({})
      setServerMessage("")
      setIsSuccess(false)

      // Procesar tech stack
      const techStackString = formData.get("techStack") as string
      const techStack = techStackString
        ? techStackString
            .split(",")
            .map((tech) => tech.trim())
            .filter(Boolean)
        : []

      const data = {
        title: formData.get('title') as string,
        status: formData.get('status') as string,
        startDate: formData.get('startDate') as string,
        endDate: formData.get('endDate') as string,
        timeSpentHours: Number.parseFloat(formData.get('timeSpentHours') as string),
        teamSize: Number.parseInt(formData.get('teamSize') as string),
        techStack,
        reason: formData.get('reason') as string,
        learnings: formData.get('learnings') as string,
        userId
      }
      // Validación final con Zod
      const result = projectCreateSchema.safeParse(data)
      if (!result.success) {
        const formErrors: { [key: string]: string } = {}
        
        // Recorrer los errores y asignarlos al objeto formErrors
        result.error.issues.forEach(issue => {
          const fieldName = issue.path[0] as string
          if (fieldName && !formErrors[fieldName]) { // Solo tomar el primer error por campo
            formErrors[fieldName] = issue.message
          }
        })
        
        // Asignar directamente a los estados locales
        setServerErrors(formErrors)
        setServerMessage("Por favor corrige los errores")
        return 
      }

      // Llamada a tu API
      const apiResponse = await createProject(data)
      
      if (apiResponse.status === "error") {
        // Asignar errores de API directamente a los estados
        const formErrors: { [key: string]: string } = {}
        apiResponse.error?.forEach(err => {
          formErrors[err.field] = err.message
        })
        
        setServerErrors(formErrors)
        setServerMessage(apiResponse.message)
        return 
      }

      // Éxito - actualizar estados
      setIsSuccess(true)
      setServerMessage(apiResponse.message || "")
      
      toast.success("Proyecto creado", {
        description: apiResponse.message || "El proyecto ha sido creado exitosamente.",
      })

    } catch (error) {
      console.error("Error al crear proyecto:", error)
      setServerMessage("Error de conexión. Inténtalo de nuevo.")
    }
  }

  // useActionState solo para submit y isPending
  const [, submitAction, isPending] = useActionState(createProjectAction, null)

  // Validación en tiempo real
  const validateField = useCallback((field: string, value: unknown) => {
    const tempData = { ...formData, [field]: value }
    const result = projectCreateSchema.safeParse(tempData)
        
    if (!result.success) {
      // Método moderno: usar issues directamente
      const fieldError = result.error.issues.find(issue => 
        issue.path.includes(field)
      )?.message
      
      setValidationErrors(prev => ({
        ...prev,
        [field]: fieldError || ""
      }))
    } else {
      setValidationErrors(prev => ({
        ...prev,
        [field]: ""
      }))
    }
  }, [formData])

  // Manejar cambios en inputs
  const handleInputChange = (field: FormFields, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (serverErrors[field]) {
      setServerErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
    // Solo validar si el campo ya fue tocado
    if (touched[field]) {
      validateField(field, value)
    }
  }
  
  const handleBlur = (field: FormFields) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    validateField(field, formData[field])
  }

  // Funciones para tech stack
  const addTech = () => {
    if (techInput.trim() && !formData.techStack.includes(techInput.trim())) {
      const newTechStack = [...formData.techStack, techInput.trim()]
      handleInputChange('techStack', newTechStack)
      setTechInput("")
    }
  }

  const removeTech = (tech: string) => {
    const newTechStack = formData.techStack.filter((t) => t !== tech)
    handleInputChange('techStack', newTechStack)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTech()
    }
  }

  // Redirigir cuando sea exitoso
  useEffect(() => {
    if (isSuccess) {
      router.push(`/users/${userId}`)
    }
  }, [isSuccess, router, userId])

  // Combinar errores de validación en tiempo real y del servidor
  const displayErrors = { ...validationErrors, ...serverErrors }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 text-blue-600 hover:text-blue-800 hover:bg-blue-100 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a Proyectos
        </Button>

        <Card className="bg-white dark:bg-gray-800 border-blue-200 dark:border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900 dark:text-blue-100">Crear Nuevo Proyecto</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Mensaje general */} 
            {serverMessage && !isSuccess && (
              <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 p-3 rounded-md mb-6">
                {serverMessage}
              </div>
            )}

            <form action={submitAction} className="space-y-6">
              {/* Input oculto para enviar el techStack al backend como string separado por comas */}
              <input type="hidden" name="techStack" value={formData.techStack.join(",")} />

              {/* Título */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-blue-800 dark:text-blue-200">
                  Título del Proyecto
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  onBlur={() => handleBlur('title')}
                  disabled={isPending}
                  aria-invalid={!!displayErrors.title}
                  className={displayErrors.title && touched.title ? "border-destructive focus-visible:ring-destructive/40" : ""}
                  placeholder="Ej: E-commerce Platform"
                />
                <div className="h-5">
                  {displayErrors.title && <p className="text-sm text-destructive">{displayErrors.title}</p>}
                </div>
              </div>

              {/* Estado y Tamaño del Equipo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-blue-800 dark:text-blue-200">
                    Estado
                  </Label>
                  <Select 
                    name="status"
                    disabled={isPending}
                    value={formData.status || "PLACEHOLDER"}
                    onValueChange={(value: "SUCCESS" | "FAILURE") => handleInputChange('status', value)}
                  >
                    <SelectTrigger 
                      className={`w-full ${
                        displayErrors.status && touched.status ? "border-destructive focus-visible:ring-destructive/40" : ""
                      }`}
                      onBlur={() => handleBlur('status')}
                    >
                      <SelectValue placeholder="Selecciona el estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PLACEHOLDER" disabled>Selecciona el estado</SelectItem>
                      <SelectItem value="SUCCESS">Exitoso</SelectItem>
                      <SelectItem value="FAILURE">Fallido</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="h-5">
                    {displayErrors.status && <p className="text-sm text-destructive">{displayErrors.status}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teamSize" className="text-blue-800 dark:text-blue-200">
                    Tamaño del Equipo
                  </Label>
                  <Input
                    id="teamSize"
                    name="teamSize"
                    type="number"
                    min="1"
                    value={formData.teamSize || ""}
                    onChange={(e) => handleInputChange('teamSize', Number.parseInt(e.target.value) || 0)}
                    onBlur={() => handleBlur('teamSize')}
                    disabled={isPending}
                    aria-invalid={!!displayErrors.teamSize}
                    className={displayErrors.teamSize && touched.teamSize ? "border-destructive focus-visible:ring-destructive/40" : ""}
                    placeholder="Ej: 4"
                  />
                  <div className="h-5">
                    {displayErrors.teamSize && <p className="text-sm text-destructive">{displayErrors.teamSize}</p>}
                  </div>
                </div>
              </div>

              {/* Fechas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-blue-800 dark:text-blue-200">
                    Fecha de Inicio
                  </Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    onBlur={() => handleBlur('startDate')}
                    disabled={isPending}
                    aria-invalid={!!displayErrors.startDate}
                    className={displayErrors.startDate && touched.startDate ? "border-destructive focus-visible:ring-destructive/40" : ""}
                  />
                  <div className="h-5">
                    {displayErrors.startDate && <p className="text-sm text-destructive">{displayErrors.startDate}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-blue-800 dark:text-blue-200">
                    Fecha de Fin
                  </Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    onBlur={() => handleBlur('endDate')}
                    disabled={isPending}
                    aria-invalid={!!displayErrors.endDate}
                    className={displayErrors.endDate && touched.endDate ? "border-destructive focus-visible:ring-destructive/40" : ""}
                  />
                  <div className="h-5">
                    {displayErrors.endDate && <p className="text-sm text-destructive">{displayErrors.endDate}</p>}
                  </div>
                </div>
              </div>

              {/* Horas trabajadas */}
              <div className="space-y-2">
                <Label htmlFor="timeSpentHours" className="text-blue-800 dark:text-blue-200">
                  Horas Trabajadas
                </Label>
                <Input
                  id="timeSpentHours"
                  name="timeSpentHours"
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={formData.timeSpentHours || ""}
                  onChange={(e) => handleInputChange('timeSpentHours', Number.parseFloat(e.target.value) || 0)}
                  onBlur={() => handleBlur('timeSpentHours')}
                  disabled={isPending}
                  aria-invalid={!!displayErrors.timeSpentHours}
                  className={displayErrors.timeSpentHours && touched.timeSpentHours ? "border-destructive focus-visible:ring-destructive/40" : ""}
                  placeholder="Ej: 320.5"
                />
                <div className="h-5">
                  {displayErrors.timeSpentHours && ( <p className="text-sm text-destructive">{displayErrors.timeSpentHours}</p> )}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-2">
                <Label className="text-blue-800 dark:text-blue-200">Stack Tecnológico</Label>
                <div className="flex gap-2">
                  <Input
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    onBlur={() => handleBlur('techStack')}
                    placeholder="Ej: React, Node.js, PostgreSQL"
                    aria-invalid={!!displayErrors.techStack}
                    className={displayErrors.techStack && touched.techStack ? "border-destructive focus-visible:ring-destructive/40" : ""}
                    disabled={isPending}
                  />
                  <Button
                    type="button"
                    onClick={addTech}
                    variant="outline"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent dark:border-gray-600 dark:text-blue-300 dark:hover:bg-gray-700"
                    disabled={isPending}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.techStack.map((tech, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700"
                      >
                        {tech}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTech(tech)}
                          className="ml-1 h-4 w-4 p-0 hover:bg-blue-200 dark:hover:bg-blue-800"
                          disabled={isPending}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="h-5">
                  {displayErrors.techStack && <p className="text-sm text-destructive">{displayErrors.techStack}</p>}
                </div>
              </div>

              {/* Razón */}
              <div className="space-y-2">
                <Label htmlFor="reason" className="text-blue-800 dark:text-blue-200">
                  Razón del Proyecto
                </Label>
                <Textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  onBlur={() => handleBlur('reason')}
                  disabled={isPending}
                  aria-invalid={!!displayErrors.reason}
                  className={`min-h-[100px]  ${
                    displayErrors.reason && touched.reason ? "border-destructive focus-visible:ring-destructive/40" : ""
                  }`}
                  placeholder="Describe por qué se realizó este proyecto..."
                />
                <div className="h-5">
                  {displayErrors.reason && <p className="text-sm text-destructive">{displayErrors.reason}</p>}
                </div>
              </div>

              {/* Aprendizajes */}
              <div className="space-y-2">
                <Label htmlFor="learnings" className="text-blue-800 dark:text-blue-200">
                  Aprendizajes
                </Label>
                <Textarea
                  id="learnings"
                  name="learnings"
                  value={formData.learnings}
                  onChange={(e) => handleInputChange('learnings', e.target.value)}
                  onBlur={() => handleBlur('learnings')}
                  disabled={isPending}
                  aria-invalid={!!displayErrors.learnings}
                  className={`min-h-[100px]  ${
                    displayErrors.learnings && touched.learnings ? "border-destructive focus-visible:ring-destructive/40" : ""
                  }`}
                  placeholder="¿Qué aprendiste durante este proyecto?"
                />
                <div className="h-5">
                  {displayErrors.learnings && <p className="text-sm text-destructive">{displayErrors.learnings}</p>}
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isPending}
                  className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-gray-600 dark:text-blue-300 dark:hover:bg-gray-700"
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  disabled={isPending} 
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creando...
                    </>
                  ) : (
                    "Crear Proyecto"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}