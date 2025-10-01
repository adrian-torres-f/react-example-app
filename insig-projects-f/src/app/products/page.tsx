"use client";

import { useEffect, useState } from "react";
import {
  getProductsPaged,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/products/api";
import { ProductItemRs } from "@/lib/products/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductItemRs[]>([]);
  const [newProduct, setNewProduct] = useState({ name: "", description: "", stock: 0 });
  const [editingProduct, setEditingProduct] = useState<ProductItemRs | null>(null);

  // Cargar productos
  const loadProducts = async () => {
    try {
      const response = await getProductsPaged(1, 50);
      setProducts(response.data?.products ?? []);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Crear producto
  const handleCreate = async () => {
    try {
      await createProduct({
        ...newProduct,
        stock: Number(newProduct.stock),
      });
      setNewProduct({ name: "", description: "", stock: 0 });
      loadProducts();
    } catch (error) {
      console.error("Error creando producto:", error);
    }
  };

  // Actualizar producto
  const handleUpdate = async () => {
    if (!editingProduct) return;
    try {
      await updateProduct(editingProduct.id, {
        ...editingProduct,
        stock: Number(editingProduct.stock),
      });
      setEditingProduct(null);
      loadProducts();
    } catch (error) {
      console.error("Error actualizando producto:", error);
    }
  };

  // Eliminar producto
  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      loadProducts();
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
      <h1 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-6">
        Listado de Productos
      </h1>

      {/*  Formulario Crear */}
      <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Crear Producto</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border p-2 mr-2 rounded"
        />
        <input
          type="text"
          placeholder="Descripción"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className="border p-2 mr-2 rounded"
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) =>
            setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })
          }
          className="border p-2 mr-2 rounded"
        />
        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Crear
        </button>
      </div>

      {/*  Lista de productos */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition"
            >
              {editingProduct?.id === product.id ? (
                <>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, name: e.target.value })
                    }
                    className="border p-2 mb-2 w-full rounded"
                  />
                  <input
                    type="text"
                    value={editingProduct.description}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, description: e.target.value })
                    }
                    className="border p-2 mb-2 w-full rounded"
                  />
                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        stock: parseInt(e.target.value) || 0,
                      })
                    }
                    className="border p-2 mb-2 w-full rounded"
                  />
                  <button
                    onClick={handleUpdate}
                    className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditingProduct(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 break-all">
                    {product.description}
                  </p>
                  <p className="text-sm font-semibold text-green-700 dark:text-green-300 mt-2">
                    Stock: {product.stock}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">
          No hay productos registrados.
        </p>
      )}
    </div>
  );
}
