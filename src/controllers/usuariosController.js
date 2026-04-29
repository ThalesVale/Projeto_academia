
// export const listarUsuarios = async (req, res) => {
//     let conn;

//     try {
//         conn = await conexao.getConnection();
//         const [usuarios] = await conn.query("SELECT id, nome, email, perfil, criado_em FROM usuarios");
//         res.status(200).json(usuarios);
//     } catch (error) {
//         console.error({ mensagem: "Erro ao listar usuários:", error: error.message });
//         res.status(500).json({ mensagem: "Erro interno do servidor" });
//     } finally {
//         if (conn) {
//             conn.release();
//         }
//     }
// }
    import * as usuariosModels from "../models/usuariosModel.js";


export const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuariosModels.listar();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao listar usuarios", error: error.message });
    }
};

export const cadastrarUsuarios = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        await usuariosModels.criar(nome, email, senha);

        res.status(201).json({ msg: "Usuário cadastrado com sucesso" });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao cadastrar usuário", error: error.message });
    }
};

export const buscarUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await usuariosModels.buscarPorId(id);

        if (usuario.length === 0) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }

        res.json(usuario[0]);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao buscar usuário", error: error.message });
    }
};

export const editarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email } = req.body;

        const usuario = await usuariosModels.buscarPorId(id);

        if (usuario.length === 0) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }

        await usuariosModels.atualizar(id, nome, email);

        res.json({ msg: "Usuário atualizado com sucesso" });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao atualizar usuário", error: error.message });
    }
};

export const deletarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await usuariosModels.buscarPorId(id);

        if (usuario.length === 0) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }

        await usuariosModels.deletar(id);

        res.json({ msg: "Usuário deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao deletar usuário", error: error.message });
    }
};