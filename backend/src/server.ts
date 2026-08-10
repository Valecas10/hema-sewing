import express from "express";
import cors from "cors";

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
    res.json({
        status: "ok",
        message: "Hema Sewing API funcionando",
    });
});

app.listen(PORT, () => {
    console.log(
        `Servidor ejecutándose en http://localhost:${PORT}`
    );
});