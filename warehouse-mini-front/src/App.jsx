import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProductsPage from "./components/ProductsPage";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [screen, setScreen] = useState("login"); // login | register | products

  function handleLoginSuccess(tok) {
    localStorage.setItem("token", tok);
    setToken(tok);
    setScreen("products");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setToken("");
    setScreen("login");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Warehouse Mini</h1>

      {screen === "login" && (
        <LoginForm
          onLogin={handleLoginSuccess}
          onShowRegister={() => setScreen("register")}
        />
      )}

      {screen === "register" && (
        <RegisterForm onBack={() => setScreen("login")} />
      )}

      {screen === "products" && token && (
        <ProductsPage token={token} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
