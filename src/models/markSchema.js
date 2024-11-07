import { required } from "joi";
import mongoose from "mongoose";

const markSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  imagen: {
    type: String,
    required: false,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

export default mongoose.model("Marks", markSchema);
