import * as treinosModels from "../models/treinosModel.js";

// 🔥 LISTAR COM INNER JOIN (OBRIGATÓRIO)
export const listarTreinos = async (req, res) => {
  const [rows] = await treinosModels.listarTreinos()
  res.json(rows)
}
// CRIAR
export const criarTreino = async (req, res) => {
  const { aluno_id, instrutor_id, nome_treino, descricao } = req.body

  await treinosModels.criarTreino(aluno_id, instrutor_id, nome_treino, descricao)
    [aluno_id, instrutor_id, nome_treino, descricao]
  

  res.json({ msg: "Treino criado" })
}

// EDITAR
export const editarTreino = async (req, res) => {
  const { id } = req.params
  const { nome_treino } = req.body

  await treinosModels.editarTreino(id, nome_treino)

  res.json({ msg: "Atualizado" })
}

// DELETAR
export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        await treinosModels.deletarTreino(id);

        res.json({ msg: "Treino deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao deletar treino", error: error.message });
    }
};