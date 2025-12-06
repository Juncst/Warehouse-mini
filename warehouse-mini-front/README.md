# 🎨 Warehouse Mini – Frontend (React + Vite + Bun)

Este es el frontend del proyecto **Warehouse Mini**, una aplicación web minimalista diseñada para que pequeños negocios gestionen su inventario de forma simple, rápida y profesional.

El frontend permite:

- Iniciar sesión con JWT
- Visualizar inventario por usuario
- Agregar productos
- Eliminar productos
- Generar un PDF profesional con el logo del negocio
- Usar una interfaz limpia y responsiva

---

## 🚀 Tecnologías utilizadas

- **React**
- **Vite**
- **Bun**
- **JavaScript (ESModules)**
- **jsPDF** (generación de PDF)
- **jsPDF-AutoTable** (tablas en PDF)
- **CSS minimalista personalizado**

---

## 📦 Instalación del proyecto

1. Entrar a la carpeta del frontend:

```bash
cd warehouse-mini-front
```

Instalar dependencias:

bun install

▶️ Ejecutar el frontend en modo desarrollo
bun dev

El proyecto estará disponible en:

http://localhost:5173

🔗 Conexión con el backend

El frontend utiliza la API del backend ubicada en:

http://localhost:4000/api

Las peticiones están organizadas en:

src/api/

Endpoints principales usados:

POST /api/auth/login

GET /api/products

POST /api/products

DELETE /api/products/:id

```

Estructura del proyecto
warehouse-mini-front/
 ├── public/
 ├── src/
 │    ├── api/
 │    │     ├── auth.js
 │    │     └── products.js
 │    ├── components/
 │    ├── pages/
 │    │     ├── LoginPage.jsx
 │    │     └── ProductsPage.jsx
 │    ├── App.jsx
 │    └── main.jsx
 ├── index.html
 ├── package.json / bunfig.toml
 └── README.md
```

✨ Funcionalidades del frontend
✔ Pantalla de Login

El usuario ingresa sus credenciales y el sistema guarda el token JWT en localStorage.

✔ Dashboard minimalista

Al autenticarse, el usuario puede:

Ver su inventario en una tabla estilizada

Agregar productos mediante un formulario simple

Eliminar productos específicos

✔ PDF profesional

Con un clic, el usuario genera un PDF con:

Logo del negocio

Título del reporte

Fecha

Tabla completa de productos

Perfecto para entregar a proveedores o como control interno.

🧩 Variables del sistema

El frontend NO usa .env por ahora, pero si se requiere API configurable:
Crear .env:

VITE_API_URL=http://localhost:4000/api

Y se usa en React:

import.meta.env.VITE_API_URL

🛠 Scripts disponibles

bun dev → Ejecutar modo desarrollo

bun build → Compilar para producción

bun preview → Previsualizar build

👨‍💻 Autor

José Castañeda
