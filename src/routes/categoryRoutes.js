import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryCtrl.js";

const router = express.Router();

//1. Creamos la ruta para CREAR un documento en la colection categories
// se crea el nuevo usuario con los datos que llegan en el body
router.post("/category", createCategory);

//2. Creamos la ruta para OBTENER todos los documentos de mi bdd en la colection users
router.get("/category", getCategories);

//3. Creamos la ruta para CONSULTAR UN DOCUMENTO de mi bdd en la colection users
router.get("/category/:id", getCategoryById);

//4. Creamos la ruta para ACTUALIZAR un documento en la colection users
router.put("/category/:id", updateCategory);

//5. Creamos la ruta para BORRAR UN DOCUMENTO de mi bdd en la colection users
router.delete("/category/:id", deleteCategory);

export default router;
