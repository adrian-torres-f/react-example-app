import { z } from "zod"

export const projectCreateSchema = z.object({
  title: z
    .string({ message: "El título es obligatorio" })
    .min(1, "El título es obligatorio"),
  
  status: z
    .string()
    .nonempty("El estado es obligatorio")
    .refine((val) => ["SUCCESS", "FAILURE"].includes(val), {
      message: "Debes seleccionar un estado",
    }),
  
  startDate: z
    .string()
    .nonempty("La fecha de inicio es obligatoria")
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "La fecha de inicio debe estar en formato YYYY-MM-DD"
    }),
  
  endDate: z
    .string()
    .nonempty("La fecha de fin es obligatoria")
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "La fecha de fin debe estar en formato YYYY-MM-DD"
    }),
  
  timeSpentHours: z
    .number({ message: "Las horas invertidas son obligatorias" })
    .min(0.1, "Las horas deben ser un número positivo"),
  
  teamSize: z
    .number({ message: "El tamaño del equipo es obligatorio" })
    .int("Debe ser un número entero")
    .min(1, "El equipo debe tener al menos 1 miembro"),
  
  techStack: z
    .array(z.string())
    .min(1, "Debe incluir al menos una tecnología"),
  
  reason: z
    .string({ message: "El motivo es obligatorio" })
    .min(1, "El motivo es obligatorio"),
  
  learnings: z
    .string({ message: "Los aprendizajes son obligatorios" })
    .min(1, "Los aprendizajes son obligatorios"),
  
  userId: z
    .number({ message: "El ID de usuario es obligatorio" })
    .int("El ID de usuario debe ser un número entero positivo")
    .min(1, "El ID de usuario debe ser un número entero positivo"),
})

export type ProjectCreateRq = z.infer<typeof projectCreateSchema>

export const projectUpdateSchema = z.object({
  title: z
    .string({ message: "El título es obligatorio" })
    .min(1, "El título es obligatorio"),
  
  status: z
    .string()
    .nonempty("El estado es obligatorio")
    .refine((val) => ["SUCCESS", "FAILURE"].includes(val), {
      message: "Debes seleccionar un estado",
    }),
  
  startDate: z
    .string()
    .nonempty("La fecha de inicio es obligatoria")
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "La fecha de inicio debe estar en formato YYYY-MM-DD"
    }),
  
  endDate: z
    .string()
    .nonempty("La fecha de fin es obligatoria")
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "La fecha de fin debe estar en formato YYYY-MM-DD"
    }),
  
  timeSpentHours: z
    .number({ message: "Las horas invertidas son obligatorias" })
    .min(0.1, "Las horas deben ser un número positivo"),
  
  teamSize: z
    .number({ message: "El tamaño del equipo es obligatorio" })
    .int("Debe ser un número entero")
    .min(1, "El equipo debe tener al menos 1 miembro"),
  
  techStack: z
    .array(z.string())
    .min(1, "Debe incluir al menos una tecnología"),
  
  reason: z
    .string({ message: "El motivo es obligatorio" })
    .min(1, "El motivo es obligatorio"),
  
  learnings: z
    .string({ message: "Los aprendizajes son obligatorios" })
    .min(1, "Los aprendizajes son obligatorios"),
});

export type ProjectUpdateRq = z.infer<typeof projectUpdateSchema>;