import conexao from "../config/db.js"

export const listarAlunos = () => {
  return conexao.query(`
    SELECT a.*, p.nome AS plano
    FROM alunos a
    LEFT JOIN planos p ON a.plano_id = p.id
  `)
}

export const criarAluno = (nome, cpf, plano_id) => {
  return conexao.query(
    "INSERT INTO alunos (nome, cpf, plano_id) VALUES (?, ?, ?)",
    [nome, cpf, plano_id]
  )
}


export const editar = async (req, res) => {
  const { id } = req.params
  const { nome } = req.body

  await conexao.query(
    "UPDATE alunos SET nome=? WHERE id=?",
    [nome, id]
  )

  res.json({ msg: "Atualizado" })
}

export const deletar = async (req, res) => {
  const { id } = req.params
  await conexao.query("DELETE FROM alunos WHERE id=?", [id])
  res.json({ msg: "Deletado" })
}