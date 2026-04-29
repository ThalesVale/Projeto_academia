import conexao from "../config/db.js"

export const listarFrequencias = () => {
  return conexao.query(`
    SELECT 
      f.id,
      f.data_frequencia,
      f.presente,
      f.observacao,
      a.nome AS aluno
    FROM frequencias f
    INNER JOIN alunos a ON f.aluno_id = a.id
  `)
}

export const criarFrequencia = (aluno_id, data, presente, obs) => {
  return conexao.query(
    "INSERT INTO frequencias (aluno_id, data_frequencia, presente, observacao) VALUES (?, ?, ?, ?)",
    [aluno_id, data, presente, obs]
  )
}

// EDITAR
export const editar = async (req, res) => {
  const { id } = req.params
  const { presente, observacao } = req.body

  await conexao.query(
    "UPDATE frequencias SET presente=?, observacao=? WHERE id=?",
    [presente, observacao, id]
  )

  res.json({ msg: "Atualizado" })
}

// DELETAR
export const deletar = async (req, res) => {
  const { id } = req.params

  await conexao.query("DELETE FROM frequencias WHERE id=?", [id])

  res.json({ msg: "Deletado" })
}