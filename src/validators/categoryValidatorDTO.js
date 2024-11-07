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

const descripcion = Joi.string() // Validar que sea de tipo string
  .min(3)
  .max(90)
  .alphanum()
  .messages({
    "string.min": "La descripción debe tener al menos 3 caracteres.",
    "string.max": "La descripción no puede exceder los 90 caracteres.",
  });

const cantidad = Joi.number().precision(1).min(1).max(1000).messages({
  "number.base": "La cantidad debe ser un número.",
  "number.min": "La cantidad debe ser mayor o igual a 1.",
  "number.max": "La cantidad debe ser menor o igual a 1000.",
});

//Ahora crearemos las validaciones para los métodos de la lógica

const createCategorySchema = Joi.object({
  nombre: nombre.required(),
  cantidad: cantidad.required(),
});

const updateCategorySchema = Joi.object({
  nombre: nombre.required(),
  descripcion: descripcion.required(),
  cantidad: cantidad.required(),
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

const deleteCategorySchema = Joi.object({
  id: id.required(),
});

export {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
};
