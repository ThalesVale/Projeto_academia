 import * as alunosModels from "../models/alunosModel.js";

export const listar = async (req, res) => {
  const [rows] = await alunosModels.listarAlunos()

  res.json(rows)
}

export const criar = async (req, res) => {
  const { nome, cpf, telefone, email, data_nascimento, plano_id } = req.body

  await alunosModels.criarAluno(nome, cpf, telefone, email, data_nascimento, plano_id)

  res.json({ msg: "Aluno criado" })
}

export const editarAluno = async (req, res) => {
  const { id } = req.params
  const { nome, cpf, telefone, email, data_nascimento, plano_id } = req.body

  await alunosModels.editarAluno(id, nome, cpf, telefone, email, data_nascimento, plano_id)

  res.json({ msg: "Atualizado" })
}

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        await alunosModels.deletarAluno(id);

        res.json({ msg: "Aluno deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao deletar aluno", error: error.message });
    }
};