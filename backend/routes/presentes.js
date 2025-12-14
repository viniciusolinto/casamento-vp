import express from "express";
import Presente from "../models/presente.js";

const router = express.Router();

/**
 * LISTAR PRESENTES
 */
router.get("/", async (req, res) => {
  const presentes = await Presente.find();
  res.json(presentes);
});

/**
 * MARCAR PRESENTE COMO COMPRADO
 */
router.post("/:id/comprar", async (req, res) => {
  const { id } = req.params;

  const presente = await Presente.findById(id);

  if (!presente) {
    return res.status(404).json({ erro: "Presente não encontrado" });
  }

  if (!presente.disponivel) {
    return res.status(400).json({ erro: "Presente já foi comprado" });
  }

  presente.disponivel = false;
  presente.compradoEm = new Date();

  await presente.save();

  res.json({ mensagem: "Presente marcado como comprado" });
});

export default router;
