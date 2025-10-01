import { z } from "zod";

//  Schema para crear un producto
export const productCreateSchema = z.object({
  name: z
    .string({ message: "El nombre es obligatorio" })
    .min(1, "El nombre es obligatorio"),

  description: z
    .string({ message: "La descripción es obligatoria" })
    .min(1, "La descripción es obligatoria"),

  stock: z
    .number({ message: "El stock es obligatorio" })
    .int("El stock debe ser un número entero")
    .min(0, "El stock no puede ser negativo"),
});

export type ProductCreateRq = z.infer<typeof productCreateSchema>;

//  Schema para actualizar un producto (todos opcionales)
export const productUpdateSchema = z.object({
  name: z.string().min(1, "El nombre no puede estar vacío").optional(),

  description: z.string().min(1, "La descripción no puede estar vacía").optional(),

  stock: z
    .number()
    .int("El stock debe ser un número entero")
    .min(0, "El stock no puede ser negativo")
    .optional(),
});

export type ProductUpdateRq = z.infer<typeof productUpdateSchema>;
