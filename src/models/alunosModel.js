import conexao from "../config/db.js"

export const listarAlunos = () => {
  return conexao.query(`
    SELECT a.*, p.nome AS plano
    FROM alunos a
    LEFT JOIN planos p ON a.plano_id = p.id
  `)
}

export const criarAluno = (nome, cpf, telefone, email, data_nascimento, plano_id) => {
  return conexao.query(
    "INSERT INTO alunos (nome, cpf, telefone, email, data_nascimento, plano_id) VALUES (?, ?, ?, ?, ?, ?)",
    [nome, cpf, telefone, email, data_nascimento, plano_id]
  )
}


export const editarAluno = async (req, res) => {
  const { id } = req.params
  const { nome, cpf, telefone, email, data_nascimento, plano_id } = req.body

  await conexao.query(
    "UPDATE alunos SET nome=?, cpf=?, telefone=?, email=?, data_nascimento=?, plano_id=? WHERE id=?",
    [nome, cpf, telefone, email, data_nascimento, plano_id, id]
  )

  res.json({ msg: "Atualizado" })
}

// export const deletarAluno = async (req, res) => {
//   const { id } = req.params
//   await conexao.query("DELETE FROM alunos WHERE id=?", [id])
//   res.json({ msg: "Deletado" })
export const deletarAluno = async (id) => {
    const conn = await conexao.getConnection();
    try {
        await conn.query(
            "DELETE FROM alunos WHERE id = ?",
            [id]
        );
    } finally {
        conn.release();
    }
};