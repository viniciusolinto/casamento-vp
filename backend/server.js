import express from "express";
import dotenv from "dotenv";
import conectarBanco from "./config/database.js";
import presentesRoutes from "./routes/presentes.js";

dotenv.config();

const app = express();
app.use(express.json());

// 🔥 CONECTA NO BANCO
conectarBanco();

// ROTAS
app.use("/presentes", presentesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
