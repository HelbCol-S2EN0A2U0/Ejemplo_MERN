import userSchema from "../models/user.js";
import { validatorHandler } from "../middleware/validator.handler.js";
import {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  deleteUserSchema,
} from "../validators/userValidatorDTO.js";

//   res.send("Esta ruta esta pensada para crear un usuario nuevo");
export const createUser = [
  validatorHandler(createUserSchema, "body"),
  async (req, res) => {
    const user = new userSchema(req.body);
    await user
      .save()
      .then((data) => res.status(201).json(data)) // Cambio el código de estado a 201 para indicar que se creó un nuevo recurso
      .catch((error) => res.status(500).json({ message: error.message })); // Asegúrate de enviar `error.message` para obtener un mensaje más claro
  },
];

export const getUsers = (req, resp) => {
  userSchema
    .find() //Metodo usado para buscar todos los docs de una coleccion
    .then((data) => resp.json(data))
    .catch((error) => resp.json({ message: error }));
};

export const getUserById = [
  validatorHandler(getUserSchema, "params"),
  async (req, resp) => {
    const { id } = req.params;
    try {
      const user = await userSchema.findById(id); //Metodo usado para buscar un documento de una coleccion
      if (!user) {
        return resp.status(404).json({
          message: "Usuario no encontrado",
        });
      }
      resp.json(user);
    } catch (error) {
      resp.status(500).json({
        message: error.message,
      });
    }
  },
];

export const updateUser = [
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  async (req, resp) => {
    const { id } = req.params;
    const { nombre, edad, genero } = req.body;
    try {
      const userUpdate = await userSchema.updateOne(
        { _id: id },
        { $set: { nombre, edad, genero } }
      );
      if (userUpdate.matchedCount === 0) {
        return resp.status(404).json({ message: "Usuario no encontrado" });
      }
      if (userUpdate.modifiedCount === 0) {
        return resp.status(400).json({ message: "No se realizaron cambios" });
      }
      resp.status(200).json({ message: "Usuario actualizado correctamente" });
    } catch (error) {
      resp.status(500).json({ message: error.message });
    }
  },
];

////
export const deleteUser = [
  validatorHandler(deleteUserSchema, "params"),

  async (req, resp) => {
    const { id } = req.params;
    try {
      const result = userSchema.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        resp.status(404).json({ message: "Usuario no encontrado" });
      }
      resp.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
      resp.status(500).json({ message: error.message });
    }
  },
];

// disableUser(){ }
