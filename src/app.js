// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// import swaggerUi from "swagger-ui-express"
// import swaggerJsdoc from "swagger-jsdoc"


// import authRoutes from "./routes/authRoutes.js"
// import usuariosRoutes from "./routes/usuariosRoutes.js"
// import alunosRoutes from "./routes/alunosRoutes.js"
// import planosRoutes from "./routes/planosRoutes.js"
// import treinosRoutes from "./routes/treinosRoutes.js"
// import instrutoresRoutes from "./routes/instrutoresRoutes.js"
// import frequenciasRoutes from "./routes/frequenciasRoutes.js"

// dotenv.config();

// const app = express();

// app.use(express.json());

// app.use(cors({
//     origin: [
//         "http://localhost:5173",
//         "https://sistema-de-academia.vercel.app"
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: [
//         "Content-Type",
//         "Authorization",
//         "ngrok-skip-browser-warning"
//     ]
// }));

// app.get("/", (req, res) => {
//     res.status(200).json({ msg: "Api funcionando" });
// });

// app.get("/teste", (req, res) => {
//     res.status(200).json({ ok: true });
// });

// app.use("/treinos", treinosRoutes)
// app.use("/planos", planosRoutes)
// app.use("/instrutores", instrutoresRoutes)
// app.use("/frequencias", frequenciasRoutes)
// app.use("/auth", authRoutes)
// app.use("/usuarios", usuariosRoutes)
// app.use("/alunos", alunosRoutes)


// const specs = swaggerJsdoc(options);

// /* =========================
//    ✅ ROTA DO SWAGGER
// ========================= */
// app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

// export default app;


import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import authRoutes from "./routes/authRoutes.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import alunosRoutes from "./routes/alunosRoutes.js";
import planosRoutes from "./routes/planosRoutes.js";
import treinosRoutes from "./routes/treinosRoutes.js";
import instrutoresRoutes from "./routes/instrutoresRoutes.js";
import frequenciasRoutes from "./routes/frequenciasRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

/* =========================
   ✅ CORS (MANTIDO COM FRONT)
========================= */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://sistema-de-academia.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "ngrok-skip-browser-warning"
  ]
}));

/* =========================
   ✅ ROTAS TESTE
========================= */
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Api funcionando" });
});

app.get("/teste", (req, res) => {
  res.status(200).json({ ok: true });
});

/* =========================
   ✅ ROTAS PRINCIPAIS
========================= */
app.use("/treinos", treinosRoutes);
app.use("/planos", planosRoutes);
app.use("/instrutores", instrutoresRoutes);
app.use("/frequencias", frequenciasRoutes);
app.use("/auth", authRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/alunos", alunosRoutes);

/* =========================
   ✅ SWAGGER CONFIG
========================= */
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Academia",
      version: "1.0.0",
      description: "Sistema completo de gerenciamento de academia",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },

  // ⚠️ ajuste conforme sua estrutura
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

/* =========================
   ✅ ROTA DO SWAGGER
========================= */
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

export default app;