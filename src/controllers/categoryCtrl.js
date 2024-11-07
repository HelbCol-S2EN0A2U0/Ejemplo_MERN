import categorySchema from "../models/categorySchema.js";
import { validatorHandler } from "../middleware/validator.handler.js";
  import {
    createCategorySchema,
    getCategorySchema,
    updateCategorySchema,
    deleteCategorySchema,
} from "../validators/categoryValidatorDTO.js";

export const createCategory = [
  validatorHandler(createCategorySchema, "body"),
  async (req, res) => {
    const category = new categorySchema(req.body);
    await category
      .save()
      .then((data) => res.status(201).json(data)) // Cambio el código de estado a 201 para indicar que se creó un nuevo recurso
      .catch((error) => res.status(500).json({ message: error.message })); // Asegúrate de enviar `error.message` para obtener un mensaje más claro
  },
];

export const getCategories = (req, resp) => {
  categorySchema
    .find() //Metodo usado para buscar todos los docs de una coleccion
    .then((data) => resp.json(data))
    .catch((error) => resp.json({ message: error }));
};

export const getCategoryById = [
  validatorHandler(getCategorySchema, "params"),
  async (req, resp) => {
    const { id } = req.params;
    try {
      const category = await categorySchema.findById(id); //Metodo usado para buscar un documento de una coleccion
      if (!category) {
        return resp.status(404).json({
          message: "Categoria no encontrada",
        });
      }
      resp.json(category);
    } catch (category) {
      resp.status(500).json({
        message: error.message,
      });
    }
  },
];

export const updateCategory = [
  validatorHandler(getCategorySchema, "params"),
  validatorHandler(updateCategorySchema, "body"),
  async (req, resp) => {
    const { id } = req.params;
    const { nombre, descripcion, cantidad } = req.body;
    try {
      const categoryUpdate = await categorySchema.updateOne(
        { _id: id },
        { $set: { nombre, descripcion, cantidad } }
      );
      if (categoryUpdate.matchedCount === 0) {
        return resp.status(404).json({ message: "Categoria no encontrada" });
      }
      if (categoryUpdate.modifiedCount === 0) {
        return resp
          .status(400)
          .json({ message: "No se realizaron cambios en la categoria" });
      }
      resp.status(200).json({ message: "Categoria actualizada correctamente" });
    } catch (error) {
      resp.status(500).json({ message: error.message });
    }
  },
];

////
export const deleteCategory = [
  // validatorHandler(deleteCategorySchema, "params"),

  async (req, resp) => {
    const { id } = req.params;
    try {
      const result = categorySchema.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        resp.status(404).json({ message: "Categoria no encontrada" });
      }
      resp.status(200).json({ message: "Categoria eliminada correctamente" });
    } catch (error) {
      resp.status(500).json({ message: error.message });
    }
  },
];

// disableUser(){ }
