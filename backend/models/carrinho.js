import mongoose from "mongoose";

const CarrinhoSchema = new mongoose.Schema({
  itens: [
    {
      presenteId: mongoose.Schema.Types.ObjectId,
      nome: String,
      preco: Number
    }
  ],
  criadoEm: { type: Date, default: Date.now },
  finalizado: { type: Boolean, default: false }
});

export default mongoose.model("Carrinho", CarrinhoSchema);
