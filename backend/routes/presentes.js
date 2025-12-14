import express from "express";
import Presente from "../models/presente.js";

const router = express.Router();

/* LISTAR PRESENTES DISPONÍVEIS */
router.get("/", async (req, res) => {
  const presentes = await Presente.find({ comprado: false });
  res.json(presentes);
});

/* MARCAR PRESENTE COMO COMPRADO */
router.post("/:id/comprar", async (req, res) => {
  await Presente.findByIdAndUpdate(req.params.id, {
    comprado: true
  });
  res.json({ sucesso: true });
});

/* CRIAR PRESENTES (APENAS UMA VEZ) */
router.post("/", async (req, res) => {
  const presente = new Presente(req.body);
  await presente.save();
  res.json(presente);
});

export default router;
