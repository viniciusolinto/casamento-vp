import express from "express";
import Presente from "../models/presente.js";

const router = express.Router();

/**
 * LISTAR PRESENTES DISPONÍVEIS
 */
router.get("/", async (req, res) => {
  const presentes = await Presente.find({ disponivel: true });
  res.json(presentes);
});

/**
 * COMPRAR UM PRESENTE (PIX UNITÁRIO)
 */
router.post("/:id/comprar", async (req, res) => {
  const { id } = req.params;

  const presente = await Presente.findById(id);

  if (!presente) {
    return res.status(404).json({ erro: "Presente não encontrado" });
  }

  if (!presente.disponivel) {
    return res.status(400).json({ erro: "Presente já comprado" });
  }

  presente.disponivel = false;
  presente.compradoEm = new Date();
  await presente.save();

  res.json({ mensagem: "Presente comprado com sucesso" });
});

/**
 * FINALIZAR CARRINHO (VÁRIOS PRESENTES)
 */
router.post("/finalizar", async (req, res) => {
  const { ids } = req.body;

  if (!ids || !ids.length) {
    return res.status(400).json({ erro: "Carrinho vazio" });
  }

  await Presente.updateMany(
    { _id: { $in: ids }, disponivel: true },
    { $set: { disponivel: false, compradoEm: new Date() } }
  );

  res.json({ mensagem: "Presentes do carrinho marcados como comprados" });
});

export default router;
