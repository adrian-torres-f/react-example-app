import { ProductItemRs } from "./product-item-rs";

export interface ProductsRs {
  products: ProductItemRs[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}