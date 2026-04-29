import conexao from "../config/db.js"

export const listarTreinos = () => {
  return conexao.query(`
    SELECT 
      t.id,
      t.nome_treino,
      t.descricao,
      a.nome AS aluno,
      i.nome AS instrutor
    FROM treinos t
    INNER JOIN alunos a ON t.aluno_id = a.id
    INNER JOIN instrutores i ON t.instrutor_id = i.id
  `)
}

export const criarTreino = (aluno_id, instrutor_id, nome, descricao) => {
  return conexao.query(
    "INSERT INTO treinos (aluno_id, instrutor_id, nome_treino, descricao) VALUES (?, ?, ?, ?)",
    [aluno_id, instrutor_id, nome, descricao]
  )
}

// EDITAR
export const editar = async (id, nome_treino) => {
  await conexao.query(
    "UPDATE treinos SET nome_treino=? WHERE id=?",
    [nome_treino, id]
  )
}

// DELETAR
export const deletar = async (req, res) => {
  try {
    const { id } = req.params;

    await conexao.query("DELETE FROM treinos WHERE id = ?", [id]);

    return res.status(200).json({ msg: "Treino deletado com sucesso" });
  } catch (error) {
    return res.status(500).json({ msg: "Erro ao deletar", error });
  }
};