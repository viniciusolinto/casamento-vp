import mongoose from "mongoose";

const CarrinhoSchema = new mongoose.Schema({
  presentes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Presente"
    }
  ],
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Carrinho", CarrinhoSchema);
