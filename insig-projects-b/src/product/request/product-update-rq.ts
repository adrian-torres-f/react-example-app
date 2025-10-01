import { body } from "express-validator";

export const productUpdateRq = () => [
    
  body("name")
    .optional()
    .trim()
    .isString().withMessage("El nombre debe ser texto"),

  body("description")
    .optional()
    .trim()
    .isString().withMessage("La descripción debe ser texto"),

  body("stock")
    .optional()
    .trim()
    .isInt({ min: 1 }).withMessage("El Stock debe tener al menos 1 producto"),

];
