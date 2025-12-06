import jwt from "jsonwebtoken";

export function protect(req, res, next) {
  console.log("===== MIDDLEWARE PROTECT =====");
  console.log("Authorization Header recibido:", req.headers.authorization);

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("❌ Header inválido o faltante");
    return res
      .status(401)
      .json({ error: "No autorizado: token faltante o inválido" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token extraído:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decodificado:", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.log("❌ Error verificando token:", error.message);
    return res.status(401).json({ error: "Token inválido" });
  }
}
