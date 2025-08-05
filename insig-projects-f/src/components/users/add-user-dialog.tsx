"use client"

import { Label } from "@radix-ui/react-label"
import { Plus, Loader2 } from "lucide-react"
import { useState, useEffect, useCallback, useActionState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { UserCreateRq, userCreateSchema } from "@/lib/users/user.schema"
import { toast } from "sonner"
import { createUser } from "@/lib/users/api"

interface AddUserDialogProps {
  onUserAdded: () => void
}

export function AddUserDialog({ onUserAdded }: AddUserDialogProps) {
  const [open, setOpen] = useState(false)

  // Estados para validación en tiempo real
  const [formData, setFormData] = useState<UserCreateRq>({
    firstName: "",
    lastName: "",
    email: ""
  })

  // Estados locales separados
  const [serverErrors, setServerErrors] = useState<{ [key: string]: string }>({})
  const [serverMessage, setServerMessage] = useState<string>("")
  const [isSuccess, setIsSuccess] = useState(false)
  
  type FormFields = keyof UserCreateRq
  
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof UserCreateRq, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof UserCreateRq, boolean>>>({})
  const [formKey, setFormKey] = useState(0)

  const createUserAction = async (
    _prevState: unknown, // No lo usamos, pero useActionState lo requiere
    formData: FormData
  ) => {
    try {
      // Limpiar estados anteriores
      setServerErrors({})
      setServerMessage("")
      setIsSuccess(false)

      const data = {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        email: formData.get('email') as string,
      }

      // Validación final con Zod
      const result = userCreateSchema.safeParse(data)
      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors
        const formErrors: { [key: string]: string } = {}
        
        Object.keys(fieldErrors).forEach(key => {
          const error = fieldErrors[key as keyof typeof fieldErrors]?.[0]
          if (error) {
            formErrors[key] = error
          }
        })
        
        // Asignar directamente a los estados locales
        setServerErrors(formErrors)
        setServerMessage("Por favor corrige los errores")
        return 
      }

      // Llamada a tu API
      const apiResponse = await createUser(data)
      
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
      
      toast.success("Usuario creado", {
        description: apiResponse.message || "El usuario ha sido creado exitosamente.",
      })

      onUserAdded()

    } catch (error) {
      console.error("Error al crear usuario:", error)
      setServerMessage("Error de conexión. Inténtalo de nuevo.")
    }
  }

  // useActionState solo para submit y isPending
  const [, submitAction, isPending] = useActionState(createUserAction, null)

  // Validación en tiempo real
  const validateField = useCallback((field: string, value: string) => {
    const tempData = { ...formData, [field]: value }
    const result = userCreateSchema.safeParse(tempData)
    
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors
      const error = fieldErrors[field as keyof typeof fieldErrors]?.[0]
      
      setValidationErrors(prev => ({
        ...prev,
        [field]: error || ""
      }))
    } else {
      setValidationErrors(prev => ({
        ...prev,
        [field]: ""
      }))
    }
  }, [formData])

  // Manejar cambios en inputs
  const handleInputChange = (field: FormFields, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Solo validar si el campo ya fue tocado
    if (touched[field]) {
      validateField(field, value)
    }
  }
  
  const handleBlur = (field: FormFields) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    validateField(field, formData[field])
  }

  const resetForm = () => {
    setFormData({ firstName: "", lastName: "", email: "" })
    setValidationErrors({})
    setTouched({})
    setServerErrors({})
    setServerMessage("")
    setIsSuccess(false)
    setFormKey(prev => prev + 1)
  }

  // Resetear cuando hay éxito
  useEffect(() => {
    if (isSuccess) {
      resetForm()
      setOpen(false)
    }
  }, [isSuccess])

  // Combinar errores de validación en tiempo real y del servidor
  const displayErrors = { ...validationErrors, ...serverErrors }

  const handleClose = () => {
    setOpen(false)
    resetForm()
  }

  return (
    <Dialog 
      open={open} 
      onOpenChange={
        (val) => {
          if (!val) handleClose()
          else setOpen(true)
        }
      }>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Agregar Usuario
        </Button>
      </DialogTrigger>
      <DialogContent key={formKey} className="sm:max-w-md bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Agregar Nuevo Usuario</DialogTitle>
        </DialogHeader>
        {/* Mensaje general */}
        {serverMessage && !isSuccess && (
          <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 p-3 rounded-md">
            {serverMessage}
          </div>
        )}
        <form action={submitAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-foreground">Nombre</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              onBlur={() => handleBlur('firstName')}
              disabled={isPending}
              aria-invalid={!!displayErrors.firstName}
              className={displayErrors.firstName && touched.firstName ? "border-destructive focus-visible:ring-destructive/40" : ""}
              placeholder="Nombre"
            />
            {displayErrors.firstName && <p className="text-sm text-destructive">{displayErrors.firstName}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-foreground">Apellido</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              onBlur={() => handleBlur('lastName')}
              aria-invalid={!!displayErrors.lastName}
              disabled={isPending}
              className={displayErrors.lastName && touched.lastName ? "border-destructive focus-visible:ring-destructive/40" : ""}
              placeholder="Apellido"
            />
            {displayErrors.lastName && <p className="text-sm text-destructive">{displayErrors.lastName}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              aria-invalid={!!displayErrors.email}
              disabled={isPending}
              className={displayErrors.email && touched.email ? "border-destructive focus-visible:ring-destructive/40" : ""}
              placeholder="usuario@ejemplo.com"
            />
            {displayErrors.email && <p className="text-sm text-destructive">{displayErrors.email}</p>}
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose} 
              disabled={isPending}
              className="border-border hover:bg-accent hover:text-accent-foreground"
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isPending} 
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creando...
                </>
              ) : (
                "Crear Usuario"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}