import express from "express";
import Presente from "../models/presente.js";

const router = express.Router();

/**
 * LISTAR PRESENTES (COM FILTRO DE CATEGORIA)
 */
router.get("/", async (req, res) => {
  try {
    const { categoria } = req.query;

    const filtro = {
      disponivel: true
    };

    if (categoria && categoria !== "Todos") {
      filtro.categoria = categoria;
    }

    const presentes = await Presente.find(filtro);
    res.json(presentes);

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar presentes" });
  }
});

/**
 * PAGAR UMA COTA
 */
router.post("/:id/pagar-cota", async (req, res) => {
  const presente = await Presente.findById(req.params.id);

  if (!presente || presente.cotasDisponiveis <= 0) {
    return res.status(400).json({ erro: "Presente indisponível" });
  }

  presente.cotasDisponiveis -= 1;

  if (presente.cotasDisponiveis === 0) {
    presente.disponivel = false;
  }

  await presente.save();
  res.json({ sucesso: true });
});

export default router;
