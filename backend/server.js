import express from "express";
import cors from "cors";
import conectarBanco from "./config/database.js";
import presentesRoutes from "./routes/presentes.js";
import dotenv from "dotenv";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

conectarBanco();

app.use("/presentes", presentesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

