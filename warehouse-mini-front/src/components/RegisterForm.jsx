import { useState } from "react";
import { registerUser } from "../api/auth";

export default function RegisterForm({ onBack }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await registerUser(username, password);
      setDone("Usuario registrado exitosamente.");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="card">
      <h2>Crear Cuenta</h2>

      {error && <p style={{ color: "var(--danger)" }}>{error}</p>}
      {done && <p style={{ color: "var(--accent)" }}>{done}</p>}

      <form onSubmit={handleSubmit}>
        <label>Usuario:</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label style={{ marginTop: "10px" }}>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button style={{ marginTop: "12px", width: "100%" }}>
          Registrarse
        </button>
      </form>

      <button
        style={{
          marginTop: "15px",
          background: "#444",
          width: "100%",
        }}
        onClick={onBack}
      >
        Volver al login
      </button>
    </div>
  );
}
