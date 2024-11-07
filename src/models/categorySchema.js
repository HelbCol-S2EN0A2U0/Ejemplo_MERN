import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  descripcion: {
    type: String,
    required: false,
  },
  cantidad: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Category", categorySchema);
