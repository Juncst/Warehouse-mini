import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

console.log("Iniciando server...");
console.log("PORT =", process.env.PORT);
console.log(
  " MONGO_URI =",
  process.env.MONGO_URI ? "OK (set)" : "NO (missing)"
);

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.get("/health", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;

await connectDB(process.env.MONGO_URI);

app.listen(PORT, () => {
  console.log(`✅ API corriendo en http://localhost:${PORT}`);
});
