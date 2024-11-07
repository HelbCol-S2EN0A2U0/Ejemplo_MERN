import express from "express";
// import userSchema from "../models/user.js";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/usersCtrl.js";

const router = express.Router();

//Creamos el 1er endpoint
//1. Creamos la ruta para CREAR un documento en la colection users
// se crea el nuevo usuario con los datos que llegan en el body
router.post("/user", createUser);

//2. Creamos la ruta para OBTENER todos los documentos de mi bdd en la colection users
router.get("/users", getUsers);

//3. Creamos la ruta para CONSULTAR UN DOCUMENTO de mi bdd en la colection users
router.get("/users/:id", getUserById);

//4. Creamos la ruta para ACTUALIZAR un documento en la colection users
router.put("/users/:id", updateUser);

//5. Creamos la ruta para BORRAR UN DOCUMENTO de mi bdd en la colection users
router.delete("/users/:id", deleteUser);

export default router;
