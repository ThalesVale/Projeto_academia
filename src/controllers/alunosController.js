 import * as alunosModels from "../models/alunosModel.js";

export const listar = async (req, res) => {
  const [rows] = await alunosModels.listarAlunos()

  res.json(rows)
}

export const criar = async (req, res) => {
  const { nome, cpf, plano_id } = req.body

  await alunosModels.criarAluno(nome, cpf, plano_id)

  res.json({ msg: "Aluno criado" })
}

export const editar = async (req, res) => {
  const { id } = req.params
  const { nome } = req.body

  await alunosModels.editar(id, nome)

  res.json({ msg: "Atualizado" })
}

export const deletar = async (req, res) => {
  const { id } = req.params
  await alunosModels.deletar(id)
  res.json({ msg: "Deletado" })
}