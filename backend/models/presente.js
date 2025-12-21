import mongoose from "mongoose";

const PresenteSchema = new mongoose.Schema({
  nome: String,
  imagem: String,

  categoria: String, // 🔴 ESSENCIAL

  valorTotal: Number,
  valorCota: Number,
  cotasDisponiveis: Number
});

export default mongoose.model("Presente", PresenteSchema);
