// import conexao from "../config/db.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { jwtConfig } from "../config/jwt.js";

import conexao from "../config/db.js";
import bcrypt from "bcryptjs";

export const listar = async () => {
    const conn = await conexao.getConnection();
    try {
        const [rows] = await conn.query(
            "SELECT id, nome, email, perfil, criado_em FROM usuarios"
        );
        return rows;
    } finally {
        conn.release();
    }
};

export const criar = async (nome, email, senha) => {
    const conn = await conexao.getConnection();
    try {
        const senhaHash = await bcrypt.hash(senha, 10);

        await conn.query(
            "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
            [nome, email, senhaHash]
        );
    } finally {
        conn.release();
    }
};

export const buscarPorId = async (id) => {
    const conn = await conexao.getConnection();
    try {
        const [rows] = await conn.query(
            `SELECT id, nome, email, perfil, criado_em 
             FROM usuarios 
             WHERE id = ?`,
            [id]
        );
        return rows;
    } finally {
        conn.release();
    }
};

export const atualizar = async (id, nome, email) => {
    const conn = await conexao.getConnection();
    try {
        await conn.query(
            "UPDATE usuarios SET nome = ?, email = ? WHERE id = ?",
            [nome, email, id]
        );
    } finally {
        conn.release();
    }
};

export const deletar = async (id) => {
    const conn = await conexao.getConnection();
    try {
        await conn.query(
            "DELETE FROM usuarios WHERE id = ?",
            [id]
        );
    } finally {
        conn.release();
    }
};