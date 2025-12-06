import { useState } from "react";
import { loginUser } from "../api/auth";

export default function LoginForm({ onLogin, onShowRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(username, password);
      onLogin(data.token);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="card">
      <h2>Iniciar Sesión</h2>

      {error && <p style={{ color: "var(--danger)" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: "15px", width: "100%" }}>
          Entrar
        </button>
      </form>

      <button
        style={{
          marginTop: "15px",
          background: "#444",
          width: "100%",
        }}
        onClick={onShowRegister}
      >
        Registrarse
      </button>
    </div>
  );
}
