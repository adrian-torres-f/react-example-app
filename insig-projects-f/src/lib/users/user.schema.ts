import { z } from "zod"

export const userCreateSchema = z.object({
  firstName: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres"),
  lastName: z
    .string()
    .min(6, "El apellido debe tener al menos 6 caracteres")
    .max(50, "El apellido no puede exceder 50 caracteres"),
  email: z
    .email({ message: "Debe ser un email válido" })
    .max(100, "El email no puede exceder 100 caracteres"),
})
export type UserCreateRq = z.infer<typeof userCreateSchema>