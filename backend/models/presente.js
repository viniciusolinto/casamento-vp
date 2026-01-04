import mongoose from "mongoose";

const PresenteSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },

  linkLoja: {
    type: String
  },

  imagem: {
    type: String
  },

  categoria: {
    type: String
  },

  valorTotal: {
    type: Number,
    required: true
  },

  valorCota: {
    type: Number,
    required: true
  },

  // 🔴 AQUI — NOVO CAMPO
  valorPago: {
    type: Number,
    default: 0
  },

  cotasDisponiveis: {
    type: Number,
    required: true
  },

  disponivel: {
    type: Boolean,
    default: true
  }
});

export default mongoose.model("Presente", PresenteSchema);
