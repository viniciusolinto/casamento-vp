import mongoose from "mongoose";

export default function conectarBanco() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB conectado com sucesso"))
    .catch((err) => console.error("❌ Erro ao conectar no MongoDB:", err.message));
}
