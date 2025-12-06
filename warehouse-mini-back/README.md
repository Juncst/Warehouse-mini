# 🛠️ Warehouse Mini – Backend (API REST)

Este backend implementa la API REST para Warehouse Mini.  
Maneja autenticación JWT, CRUD de productos y conexión a MongoDB.

---

## 🚀 Tecnologías Usadas

- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **MongoDB + Mongoose** - Base de datos y ODM
- **JWT** - Autenticación con tokens
- **bcrypt** - Encriptación de contraseñas
- **Bun** - Runtime y gestor de paquetes

---

## 📦 Instalación

1. Clona el repositorio
2. Navega al directorio `backend`:

   ```bash
   cd backend

   bun install
   ```

---

## Configuración

Variables de Entorno
Crea un archivo .env en la raíz del proyecto con las siguientes variables:

env
PORT=4000
MONGO_URI=mongodb://localhost:27017/warehouse_mini
JWT_SECRET=tu_secreto_aqui
Nota: Reemplaza tu_secreto_aqui con una cadena segura para JWT.
