import * as frequenciasModels from "../models/frequenciasModel.js";
// LISTAR

export const listar = async (req, res) => {
  const [rows] = await frequenciasModels.listarFrequencias()

  res.json(rows)
}

// CRIAR
export const criar = async (req, res) => {
  const { aluno_id, data_frequencia, presente, observacao } = req.body

  await frequenciasModels.criarFrequencia(aluno_id, data_frequencia, presente, observacao)

  res.json({ msg: "Frequência registrada" })
}
// EDITAR
export const editar = async (req, res) => {
  const { id } = req.params
  const { presente, observacao } = req.body

  await frequenciasModels.editar(id, presente, observacao)

  res.json({ msg: "Atualizado" })
}

// DELETAR
export const deletar = async (req, res) => {
  const { id } = req.params

  await frequenciasModels.deletar(id)

  res.json({ msg: "Deletado" })
}