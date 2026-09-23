import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import fabricRoutes from "./routes/fabricRoutes";
import orderRoutes from "./routes/orderRoutes";
import adminRoutes from "./routes/adminRoutes";
import contactRoutes from "./routes/contactRoutes";
import galleryRoutes from "./routes/galleryRoutes";
import path from "path";

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(
    "/uploads",
    express.static(
        path.join(
            process.cwd(),
            "uploads"
        )
    )
);

app.get("/api/health", (_req, res) => {
    res.json({
        status: "ok",
        message: "Hema Sewing API funcionando",
    });
});

app.use(
    "/api/products",
    productRoutes
);

app.use(
    "/api/categories",
    categoryRoutes
);

app.use(
    "/api/fabrics",
    fabricRoutes
);

app.use(
    "/api/orders",
    orderRoutes
);

app.use(
    "/api/admin",
    adminRoutes
);

app.use(
    "/api/contact",
    contactRoutes
);

app.use(
    "/api/gallery",
    galleryRoutes
);

app.listen(PORT, () => {
    console.log(
        `Servidor ejecutándose en http://localhost:${PORT}`
    );
});

