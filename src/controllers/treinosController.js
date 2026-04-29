import * as treinosModels from "../models/treinosModel.js";

// 🔥 LISTAR COM INNER JOIN (OBRIGATÓRIO)
export const listar = async (req, res) => {
  const [rows] = await treinosModels.listarTreinos()
  res.json(rows)
}
// CRIAR
export const criar = async (req, res) => {
  const { aluno_id, instrutor_id, nome_treino, descricao } = req.body

  await treinosModels.criarTreino(aluno_id, instrutor_id, nome_treino, descricao)
    [aluno_id, instrutor_id, nome_treino, descricao]
  

  res.json({ msg: "Treino criado" })
}

// EDITAR
export const editar = async (req, res) => {
  const { id } = req.params
  const { nome_treino } = req.body

  await treinosModels.atualizarTreino(id, nome_treino)

  res.json({ msg: "Atualizado" })
}

// DELETAR
export const deletar = async (req, res) => {
  const { id } = req.params

  await treinosModels.deletarTreino(id)

  res.json({ msg: "Deletado" })
}