 import * as planosModels from "../models/planosModel.js";

export const listar = async (req, res) => {
  const [rows] = await planosModels.listarPlanos()
  res.json(rows)
}

export const criar = async (req, res) => {
  const { nome, descricao, valor, duracao_meses } = req.body

  await planosModels.criarPlano(nome, descricao, valor, duracao_meses)

  res.json({ msg: "Plano criado" })
}

export const editar = async (req, res) => {
  const { id } = req.params
  const { nome, valor } = req.body

  await planosModels.editarPlano(id, nome, valor)

  res.json({ msg: "Atualizado" })
}

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        await planosModels.deletarPlano(id);

        res.json({ msg: "Plano deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao deletar plano", error: error.message });
    }
};