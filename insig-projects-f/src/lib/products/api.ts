import { ApiResponse } from "@/types/api-response";
import { ProductCreateRq, ProductUpdateRq } from "./product.schema";
import { ProductDetailRs, ProductItemRs, ProductsRs } from "./product";

const API_URL = process.env.NEXT_PUBLIC_API_V1_URL;

const PRODUCT_URL = `${API_URL}/products`;

//  Crear producto
export async function createProduct(
  productData: ProductCreateRq
): Promise<ApiResponse<ProductDetailRs>> {
  const res = await fetch(PRODUCT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  const responseBody = await res.json();
  console.log("Response Body:", JSON.stringify(responseBody, null, 2));
  return responseBody;
}

//  Listar productos con paginación
export async function getProductsPaged(
  page = 1,
  limit = 10
): Promise<ApiResponse<ProductsRs>> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  const res = await fetch(`${PRODUCT_URL}/paginated?${params.toString()}`);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error al obtener productos: ${res.status} - ${errorText}`);
  }

  const data = await res.json();
  return data;
}

//  Obtener un producto por ID
export async function getProductById(
  id: number
): Promise<ApiResponse<ProductItemRs>> {
  const res = await fetch(`${PRODUCT_URL}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseBody = await res.json();
  console.log("Response Body:", JSON.stringify(responseBody, null, 2));
  return responseBody;
}

//  Actualizar producto
export async function updateProduct(
  id: number,
  productData: ProductUpdateRq
): Promise<ApiResponse<ProductDetailRs>> {
  const res = await fetch(`${PRODUCT_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  const responseBody = await res.json();
  console.log("Response Body:", JSON.stringify(responseBody, null, 2));
  return responseBody;
}

//  Eliminar producto
export async function deleteProduct(
  id: number
): Promise<ApiResponse<ProductDetailRs>> {
  const res = await fetch(`${PRODUCT_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error al eliminar producto: ${errorText || res.status}`);
  }

  return res.json();
}
