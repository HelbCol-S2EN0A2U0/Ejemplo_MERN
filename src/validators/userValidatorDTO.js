import Joi from "joi";

//Creamos las validaciones para cada campo
const id = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .required()
  .messages({
    "string.pattern.base":
      "El campo ID debe ser un ObjectId válido de 24 caracteres hexadecimales.",
    "any.required": "El campo ID es requerido.",
  });

const nombre = Joi.string()
  .min(3)
  .max(90)
  .required()
  .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/)
  .messages({
    "string.base": "El nombre debe ser un texto",
    "string.empty": "El nombre no puede estar vacío.",
    "string.min": "El nombre debe tener al menos 3 caracteres.",
    "string.max": "El nombre no puede exceder los 90 caracteres.",
    "string.pattern.base": "El nombre solo puede contener letras y espacios.",
    "any.required": "El nombre es un campo requerido",
  });
const Edad = Joi.number().precision(1).min(18).max(99).messages({
  "number.base": "La edad debe ser un número.",
  "number.min": "La edad debe ser mayor e igual a 18.",
  "number.max": "La eda no puede exceder 99.",
});
const genero = Joi.string() // Validar que sea de tipo string
  .regex(/^[A-Za-z]+$/) // Validar que contenga solo letras
  .required() // Validar que sea requerido
  .messages({
    "string.pattern.base": "El campo genero solo puede contener letras",
    "any.required": "El campo genero es requerido",
  });

//Ahora crearemos las validaciones para los métodos de la lógica

const createUserSchema = Joi.object({
  nombre: nombre.required(),
  Edad: Edad.required(),
  genero: genero.required(),
});

const updateUserSchema = Joi.object({
  nombre: nombre.required(),
  Edad: Edad.required(),
  genero: genero.required(),
});

const getUserSchema = Joi.object({
  id: id.required(),
});

const deleteUserSchema = Joi.object({
  id: id.required(),
});

export { createUserSchema, updateUserSchema, getUserSchema, deleteUserSchema };
