const API_URL = "http://localhost:4000";

// Obtener productos del usuario logueado
export async function getProducts(token) {
  const res = await fetch(`${API_URL}/api/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Error al cargar productos");
  }

  return data;
}

// Crear producto
export async function createProduct(token, product) {
  const res = await fetch(`${API_URL}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Error al crear producto");
  }

  return data;
}

// Eliminar producto
export async function deleteProduct(token, id) {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Error al eliminar producto");
  }

  return data;
}
