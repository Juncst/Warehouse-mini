import { useEffect, useState } from "react";
import { getProducts, createProduct, deleteProduct } from "../api/products";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../assets/logo.png";

export default function ProductsPage({ token, onLogout }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    cantidad: "",
    fechaVencimiento: "",
  });

  useEffect(() => {
    cargarProductos();
  }, []);

  async function cargarProductos() {
    try {
      setLoading(true);
      setError("");
      const data = await getProducts(token);
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "precio" || name === "cantidad" ? Number(value) : value,
    }));
  }

  async function handleCreate(e) {
    e.preventDefault();
    setError("");

    try {
      await createProduct(token, form);
      setForm({
        nombre: "",
        precio: "",
        cantidad: "",
        fechaVencimiento: "",
      });
      cargarProductos();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm("¿Eliminar este producto?")) return;
    try {
      setError("");
      await deleteProduct(token, id);
      cargarProductos();
    } catch (err) {
      setError(err.message);
    }
  }

  function generarPDF() {
    const doc = new jsPDF({
      unit: "pt", // puntos -> más preciso
    });

    const pageWidth = doc.internal.pageSize.getWidth();

    // ==========================
    // LOGO PROFESIONAL (600px recomendado)
    // ==========================
    const logoWidth = 120; // tamaño ideal dentro del PDF
    const logoHeight = 120;

    // Centrar horizontalmente
    const centerX = (pageWidth - logoWidth) / 2;

    // Insertar logo
    doc.addImage(logo, "PNG", centerX, 40, logoWidth, logoHeight);

    // ==========================
    // TÍTULO PRINCIPAL
    // ==========================
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Reporte de Productos - Warehouse Mini", pageWidth / 2, 190, {
      align: "center",
    });

    // ==========================
    // FECHA
    // ==========================
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, pageWidth / 2, 210, {
      align: "center",
    });

    // ==========================
    // TABLA DE PRODUCTOS
    // ==========================
    autoTable(doc, {
      startY: 240, // dejar espacio debajo del título
      margin: { left: 40, right: 40 },
      head: [["Nombre", "Precio", "Cantidad", "Vence"]],
      body: products.map((p) => [
        p.nombre,
        "Q" + p.precio,
        p.cantidad,
        new Date(p.fechaVencimiento).toLocaleDateString(),
      ]),

      styles: {
        halign: "center",
        cellPadding: 6,
        fontSize: 11,
      },

      headStyles: {
        fillColor: [20, 60, 120], // azul corporativo
        textColor: 255,
        fontStyle: "bold",
      },

      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    // ==========================
    // FOOTER PROFESIONAL
    // ==========================
    doc.setFontSize(10);
    doc.setTextColor(130);
    doc.text(
      "Documento generado automáticamente por Warehouse Mini",
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 25,
      { align: "center" }
    );

    // Guardar PDF
    doc.save("productos.pdf");
  }

  return (
    <div className="card" style={{ maxWidth: "900px" }}>
      <h2>Mis Productos</h2>

      {/* BOTONES SUPERIORES AGRUPADOS */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        <button onClick={onLogout}>Cerrar sesión</button>

        <button onClick={generarPDF} style={{ background: "#555" }}>
          Descargar PDF
        </button>
      </div>

      {error && <p style={{ color: "var(--danger)" }}>{error}</p>}

      {/* TABLA DE PRODUCTOS */}
      <table
        style={{
          width: "100%",
          marginTop: "10px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ background: "#333" }}>
            <th style={{ padding: "10px" }}>Nombre</th>
            <th style={{ padding: "10px" }}>Precio</th>
            <th style={{ padding: "10px" }}>Cantidad</th>
            <th style={{ padding: "10px" }}>Vence</th>
            <th style={{ padding: "10px" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan="5" style={{ padding: "15px", textAlign: "center" }}>
                No hay productos
              </td>
            </tr>
          )}

          {products.map((p) => (
            <tr key={p._id} style={{ borderBottom: "1px solid #444" }}>
              <td style={{ padding: "8px" }}>{p.nombre}</td>
              <td style={{ padding: "8px" }}>Q{p.precio}</td>
              <td style={{ padding: "8px" }}>{p.cantidad}</td>
              <td style={{ padding: "8px" }}>
                {new Date(p.fechaVencimiento).toLocaleDateString()}
              </td>
              <td style={{ padding: "8px" }}>
                <button className="danger" onClick={() => handleDelete(p._id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr style={{ margin: "25px 0", borderColor: "#444" }} />

      {/* FORMULARIO DE CREAR PRODUCTO */}
      <h3>Agregar Producto</h3>
      <form onSubmit={handleCreate} style={{ display: "grid", gap: "10px" }}>
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="cantidad"
          placeholder="Cantidad"
          value={form.cantidad}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="fechaVencimiento"
          value={form.fechaVencimiento}
          onChange={handleChange}
          required
        />

        <button type="submit" style={{ marginTop: "10px", width: "200px" }}>
          Agregar
        </button>
      </form>
    </div>
  );
}
