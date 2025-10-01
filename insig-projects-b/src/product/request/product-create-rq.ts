import { body } from "express-validator";

export const productCreateRq = () => [

  body("name")
    .trim()
    .notEmpty().withMessage("El nombre es obligatorio")
    .isString().withMessage("El nombre debe ser texto"),

  body("description")
    .trim()
    .notEmpty().withMessage("La descripción es obligatoria")
    .isString().withMessage("El descripción debe ser texto"),
    
  body("stock")
    .trim()
    .notEmpty().withMessage("El Stock es obligatorio")
    .isInt().withMessage("El Stock debe ser un entero"),
    
];
