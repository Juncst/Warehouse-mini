import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

// Registrar usuario
export async function register(req, res) {
  try {
    const { username, password } = req.body;

    // verificar si ya existe
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    // encriptar pass
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashed,
    });

    res.status(201).json({ msg: "Usuario registrado", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Login
export async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Ver si existe
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    // Verificar password
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    // Crear token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ msg: "Login exitoso", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
