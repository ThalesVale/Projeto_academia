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
export const editarTreino = async (id, nome_treino) => {
  await conexao.query(
    "UPDATE treinos SET nome_treino=? WHERE id=?",
    [nome_treino, id]
  )
}

// DELETAR
export const deletarTreino = async (id) => {
    const conn = await conexao.getConnection();
    try {
        await conn.query(
            "DELETE FROM treinos WHERE id = ?",
            [id]
        );
    } finally {
        conn.release();
    }
};