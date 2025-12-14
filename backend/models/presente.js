import mongoose from "mongoose";

const PresenteSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },

  preco: {
    type: Number,
    required: true
  },

  imagem: {
    type: String,
    required: true
  },

  linkLoja: {
    type: String,
    required: true
  },

  disponivel: {
    type: Boolean,
    default: true
  },

  compradoEm: {
    type: Date
  }
});

export default mongoose.model("Presente", PresenteSchema);
