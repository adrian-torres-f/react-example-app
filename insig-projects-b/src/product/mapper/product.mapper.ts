import { Product } from "@prisma/client";
import { ProductDetailRs } from "../response/product-detail-rs";
import { ProductItemRs } from "../response/product-item-rs";

export function toProductDetailRs(project: Product): ProductDetailRs {
  return {
    id: project.id,
    name: project.name,
    description: project.description,
    stock: project.stock,
  };
}

export function toProductItemRs(product: Product): ProductItemRs {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    stock: product.stock,
  };
}