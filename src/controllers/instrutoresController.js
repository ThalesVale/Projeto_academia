 import * as instrutoresModels from "../models/instrutoresModel.js";

// LISTAR
export const listar = async (req, res) => {
  const [rows] = await instrutoresModels.listarInstrutores()
  res.json(rows)
}

// CRIAR
export const criar = async (req, res) => {
  const { nome, especialidade, telefone, email } = req.body

  await instrutoresModels.criarInstrutor(nome, especialidade, telefone, email)

  res.json({ msg: "Instrutor criado" })
}

// EDITAR
export const editar = async (req, res) => {
  const { id } = req.params
  const { nome, especialidade } = req.body

  await instrutoresModels.atualizarInstrutor(id, nome, especialidade)

  res.json({ msg: "Atualizado" })
}

// DELETAR
export const deletar = async (req, res) => {
  const { id } = req.params

  await instrutoresModels.deletarInstrutor(id)

  res.json({ msg: "Deletado" })
}