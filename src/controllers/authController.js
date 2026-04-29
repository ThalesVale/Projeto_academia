// import conexao from "../config/db.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { jwtConfig } from "../config/jwt.js";

// export const registrar = async (req, res) => {
//     let conn;

//     try{
//         const {nome, email, senha, perfil} = req.body
//         if(!nome || !email || !senha){
//             return res.status(400).json ({mensagem: "Nome, email e senha são obrigatórios"})
//         }

//         conn = await conexao.getConnection();

//         const [rows] = await conn.query("SELECT * FROM usuarios WHERE email = ?", [email]);

//         if (rows.length > 0){
//             return res.status(400).json ({mensagem: "Email já cadastrado"})
//         }

//         const senhaCriptografada = await bcrypt.compare(senha,10);

//         await conn.query("INSERT INTO (nome, email, senha, perfil), VALUES (?, ?, ?, ?", 
//             [nome, email, senhaCriptografada,perfil || "admin"])
//         res.status(201).json({mensagem: "Usuário criado com sucesso"})
//     }catch (error){
//         res. status(500).json({
//             mensagem: "Erro ao registrar",
//             error: error.message
//         })
//     }finally{
//         if (conn) conn.release();
//     }
// }





import conexao from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js";

export const registrar = async (req, res) => {
    let conn;

    console.log(req.body);
    try {
        const { nome, email, senha, perfil } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ messagem: "Nome, email e senha são obrigatórios" })
        }

        conn = await conexao.getConnection();

        const [rows] = await conn.query("SELECT * FROM usuarios WHERE email = ?", [email]);

        if (rows.length > 0) {
            return res.status(400).json({ messagem: "Email ja cadastrado" })
        }

        const senhaCriptografa = await bcrypt.hash(senha, 10);

        await conn.query(`INSERT INTO usuarios (nome, email, senha, perfil) 
                        VALUES (?, ?, ?, ?)`, [nome, email, senhaCriptografa, perfil || "admin"])

        res.status(201).json({ mensagem: "Usuário criado com sucesso" });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao registrar",
            erro: error.message
        });
    } finally {
        if (conn) conn.release();
    }
}

export const login = async (req, res) => {
    let conn; 

    try {
        const {email, senha} = req.body;

        if(!email || !senha){
            return res.status(400).json({mensagem: "Email e senha e obrigatórios"})
        }

        conn = await conexao.getConnection();

        const [rows] = await conn.query(`SELECT * FROM usuarios WHERE email = ? `,[email])

        if(rows.length ===0){
            return res.status(400).json({mensagem: "Senha ou usuário não encontrado"})
        }

        const usuario = rows[0];

        if(!usuario.senha){
             return res.status(400).json({mensagem: "Senha do usuário não encontrado"})
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if(!senhaValida){
            return res.status(401).json({msg: "Senha invalida"})
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            },
            jwtConfig.secret,
            {expiresIn: "8h"}
        )
        
        res.json({
            mensagem: "Login realizado com sucesso",
            token
        })
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro no login",
            error: error.message
        })
    }finally{
        if(conn) conn.release()
    }
}