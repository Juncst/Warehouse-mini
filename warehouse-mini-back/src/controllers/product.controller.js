import { Product } from "../models/Product.js";

// Crear producto (solo usuario logueado)
export async function crearProducto(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const data = req.body;
    data.owner = req.user.id; // asignar dueño

    const producto = await Product.create(data);
    res.status(201).json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Listar productos del usuario logueado
export async function listarProductos(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const productos = await Product.find({ owner: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Actualizar producto
export async function actualizarProducto(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const producto = await Product.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id }, // solo dueño puede modificar
      req.body,
      { new: true }
    );

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Eliminar producto
export async function eliminarProducto(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const producto = await Product.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({ msg: "Producto eliminado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
