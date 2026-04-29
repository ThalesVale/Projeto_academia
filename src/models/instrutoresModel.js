import conexao from "../config/db.js"

export const listarInstrutores = () => {
  return conexao.query("SELECT * FROM instrutores")
}

export const criarInstrutor = (nome, especialidade) => {
  return conexao.query(
    "INSERT INTO instrutores (nome, especialidade) VALUES (?, ?)",
    [nome, especialidade]
  )
}

// EDITAR
export const editar = async (id, nome, especialidade) => {
  await conexao.query(
    "UPDATE instrutores SET nome=?, especialidade=? WHERE id=?",
    [nome, especialidade, id]
  )
}

// DELETAR
export const deletar = async (id) => {
  await conexao.query("DELETE FROM instrutores WHERE id=?", [id])
}
