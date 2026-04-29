import conexao from "../config/db.js"

export const listarPlanos = () => {
  return conexao.query("SELECT * FROM planos")
}

export const criarPlano = (nome, descricao, valor, duracao) => {
  return conexao.query(
    "INSERT INTO planos (nome, descricao, valor, duracao_meses) VALUES (?, ?, ?, ?)",
    [nome, descricao, valor, duracao]
  )
}

export const editar = async (id, nome, valor) => {
  await conexao.query(
    "UPDATE planos SET nome=?, valor=? WHERE id=?",
    [nome, valor, id]
  )

  res.json({ msg: "Atualizado" })
}

export const deletar = async (req, res) => {
  const { id } = req.params
  await conexao.query("DELETE FROM planos WHERE id=?", [id])
  res.json({ msg: "Deletado" })
}