import mongoose from "mongoose";

const PresenteSchema = new mongoose.Schema({
  nome: String,
  preco: Number,
  imagem: String,
  comprado: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model("Presente", PresenteSchema);
