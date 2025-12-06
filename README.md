# 📦 Warehouse Mini

Warehouse Mini es una aplicación web full-stack diseñada para que pequeños negocios gestionen su inventario de forma simple, rápida y profesional.  
Incluye autenticación, CRUD de productos y generación de reportes PDF con logo.

## 🚀 Tecnologías

### Frontend

- React
- Vite
- Bun
- jsPDF + AutoTable

### Backend

- Node.js
- Express
- MongoDB + Mongoose
- JSON Web Tokens

## 📂 Estructura del repositorio

```
Warehouse-mini/
├── backend/
│ ├── src/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── .gitignore
│ └── README.md
└── frontend/
├── src/
├── public/
├── .gitignore
└── README.md
```

## ▶️ Cómo ejecutar el proyecto

### Backend

```bash
cd backend
bun install
bun run src/server.js

Backend en:

http://localhost:4000

Frontend
cd frontend
bun install
bun dev

```

###Frontend en:

```bash


http://localhost:5173

Endpoints principales

POST /api/auth/login

GET /api/products

POST /api/products

DELETE /api/products/:id
```

---
