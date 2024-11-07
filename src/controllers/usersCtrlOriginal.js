import express from "express";
import userSchema from "../models/user.js";
import { validatorHandler } from "../middleware/validator.handler.js";
import {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} from "../validators/userValidatorDTO.js";

//   res.send("Esta ruta esta pensada para crear un usuario nuevo");
export const createUser = (req, res) => {
  const user = new userSchema(req.body);
  user
    .save()
    .then((data) => res.status(201).json(data)) // Cambio el código de estado a 201 para indicar que se creó un nuevo recurso
    .catch((error) => res.status(500).json({ message: error.message })); // Asegúrate de enviar `error.message` para obtener un mensaje más claro
};

export const getUsers = (req, resp) => {
  userSchema
    .find() //Metodo usado para buscar todos los docs de una coleccion
    .then((data) => resp.json(data))
    .catch((error) => resp.json({ message: error }));
};

export const getUserById = (req, resp) => {
  const { id } = req.params;
  userSchema
    .findById(id) //Metodo usado para buscar un documento de una coleccion
    .then((data) => resp.json(data))
    .catch((error) => resp.json({ message: error }));
};

export const updateUser = (req, resp) => {
  const { id } = req.params;
  const { nombre, edad, genero } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { nombre, edad, genero } })
    .then((data) => resp.json(data))
    .catch((error) => resp.json({ message: error }));
};

export const deleteUser = (req, resp) => {
  const { id } = req.params;
  userSchema
    .deleteOne({ _id: id })
    .then((data) => resp.json(data))
    .catch((error) => resp.json({ message: error }));
};

// disableUser(){ }
