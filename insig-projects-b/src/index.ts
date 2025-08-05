import express from "express";
import cors from "cors";
import { testConnection } from "./lib/prisma"

if (process.env.NODE_ENV !== "production") {
  process.loadEnvFile();
  testConnection();
}

const app = express();
const PORT = process.env.PORT || 3000;
const AUTHOR = process.env.AUTHOR || "Desconocido";
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:3000"];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Politica de CORS: Acceso denegado desde este origen."));
    }
  },
  credentials: true, 
}));

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("✅ Servidor Express funcionando correctamente.");
});

app.get("/api/v1/credentials", (req, res) => {
  res.json({ author: AUTHOR });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
