import mongoose from "mongoose";
import express from "express"; // importamos el pqte express
import dotenv from "dotenv";
import userRoutes from "./routes/users.js"; // importamos el archivo donde manejamos las routes del App>
import categoryRoutes from "./routes/categoryRoutes.js";

import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express(); //Ejecutamos express y le asignamos a la variable app
//middleware para convertir de json a objetos javascript
app.use(express.json());
const port = process.env.PORT || 5000; //Indicamos que escuche por el puerto indicado,
//sino hay ninguno que use el 5000

// Middleware para manejar datos URL-encoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// middelware para incorporar como prefijo la silaba "/api" a cada endpoint
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);

//Usamos el metodo para conectarnos a la BdD de mongoose
const clientOptions = {
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
};

mongoose
  .connect(process.env.MONGODB_URI, clientOptions)
  .then(() => {
    console.log("Conectado a MONGOBD Atlas (WEB)");
  })
  .catch((error) => {
    console.log(`Ocurrio el siguiente error al conectarse == ${error.message}`);
  });

//Ruta base del APIWEB, nuestro endpoint base
app.get("/", (req, res) => {
  res.send("<h1>Bienvenido a mi API-WEB</h1>");
});

app.listen(port, () => {
  console.log(`Se inicio el servidor, y esta escuchando por el puerto ${port}`);
});
