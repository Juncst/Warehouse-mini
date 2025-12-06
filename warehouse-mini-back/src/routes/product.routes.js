import { Router } from "express";
import {
  crearProducto,
  listarProductos,
  actualizarProducto,
  eliminarProducto,
} from "../controllers/product.controller.js";

import { protect } from "../middlewares/auth.js";

const router = Router();

// rutas protegidas
router.post("/", protect, crearProducto);
router.get("/", protect, listarProductos);
router.put("/:id", protect, actualizarProducto);
router.delete("/:id", protect, eliminarProducto);

export default router;
