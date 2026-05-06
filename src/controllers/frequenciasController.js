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

  await frequenciasModels.editarFrequencia(id, presente, observacao)

  res.json({ msg: "Atualizado" })
}

// DELETAR
export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        await frequenciasModels.deletarFrequencia(id);

        res.json({ msg: "Frequência deletada com sucesso" });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao deletar frequência", error: error.message });
    }
};