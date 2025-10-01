//  Modelo base de un producto
export interface Product {
  id: number;
  name: string;
  description: string;
  stock: number;
}

//  Respuesta paginada
export interface ProductsRs {
  products: Product[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

//  Item resumido (para listados)
export interface ProductItemRs {
  id: number;
  name: string;
  description: string;
  stock: number;
}

//  Detalle completo (para vistas individuales)
export interface ProductDetailRs {
  id: number;
  name: string;
  description: string;
  stock: number;
}
