import express from "express";
import Carrinho from "../models/carrinho.js";
import Presente from "../models/presente.js";

const router = express.Router();

/* Criar carrinho */
router.post("/criar", async (req, res) => {
  const carrinho = await Carrinho.create({ itens: [] });
  res.json(carrinho);
});

/* Adicionar item */
router.post("/:id/adicionar/:presenteId", async (req, res) => {
  const { id, presenteId } = req.params;

  const presente = await Presente.findById(presenteId);
  if (!presente || !presente.disponivel) {
    return res.status(400).json({ erro: "Presente indisponível" });
  }

  const carrinho = await Carrinho.findById(id);
  carrinho.itens.push({
    presenteId,
    nome: presente.nome,
    preco: presente.preco
  });

  await carrinho.save();
  res.json(carrinho);
});

/* Finalizar carrinho */
router.post("/:id/finalizar", async (req, res) => {
  const carrinho = await Carrinho.findById(req.params.id);

  for (const item of carrinho.itens) {
    await Presente.findByIdAndUpdate(item.presenteId, {
      disponivel: false
    });
  }

  carrinho.finalizado = true;
  await carrinho.save();

  res.json({ mensagem: "Carrinho finalizado" });
});

export default router;
