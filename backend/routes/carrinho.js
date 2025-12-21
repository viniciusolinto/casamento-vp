import express from "express";
import Carrinho from "../models/carrinho.js";
import Presente from "../models/presente.js";

const router = express.Router();

/* ===============================
   CRIAR CARRINHO
================================ */
router.post("/", async (req, res) => {
  const carrinho = await Carrinho.create({ presentes: [] });
  res.json(carrinho);
});

/* ===============================
   ADICIONAR PRESENTE AO CARRINHO
================================ */
router.post("/:carrinhoId/adicionar/:presenteId", async (req, res) => {
  const { carrinhoId, presenteId } = req.params;

  const carrinho = await Carrinho.findById(carrinhoId);
  const presente = await Presente.findById(presenteId);

  if (!carrinho || !presente) {
    return res.status(404).json({ erro: "Carrinho ou presente não encontrado" });
  }

  carrinho.presentes.push(presente._id);
  await carrinho.save();

  res.json({ mensagem: "Presente adicionado ao carrinho" });
});

/* ===============================
   VER CARRINHO
================================ */
router.get("/:carrinhoId", async (req, res) => {
  const carrinho = await Carrinho
    .findById(req.params.carrinhoId)
    .populate("presentes");

  res.json(carrinho);
});

export default router;
