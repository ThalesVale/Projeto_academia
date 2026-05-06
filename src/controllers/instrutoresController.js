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
export const editarInstrutor = async (req, res) => {
  const { id } = req.params
  const { nome, especialidade } = req.body

  await instrutoresModels.editarInstrutor(id, nome, especialidade)

  res.json({ msg: "Atualizado" })
}

// DELETAR
export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        await instrutoresModels.deletarInstrutor(id);

        res.json({ msg: "Instrutor deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao deletar instrutor", error: error.message });
    }
};