import mongoose from "mongoose";

const PresenteSchema = new mongoose.Schema({
  nome: String,
  preco: Number,
  imagem: String,
  linkLoja: String,
  disponivel: {
    type: Boolean,
    default: true
  },
  compradoEm: Date
});

export default mongoose.model("Presente", PresenteSchema);
