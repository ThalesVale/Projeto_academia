import express from "express";
import { verificarToken } from "../middlewares/authmiddleware.js";
import {
    listarUsuarios,
    cadastrarUsuarios,
    buscarUsuarioPorId,
    editarUsuario,
    deletarUsuario
} from "../controllers/usuariosController.js";

const router = express.Router();

router.get("/", verificarToken, listarUsuarios);
router.post("/", verificarToken, cadastrarUsuarios);
router.get("/:id", verificarToken, buscarUsuarioPorId);
router.put("/:id", verificarToken, editarUsuario);
router.delete("/:id", verificarToken, deletarUsuario);

export default router;