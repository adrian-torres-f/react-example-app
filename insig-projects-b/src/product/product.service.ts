import { ProductRepository } from "./product.repository";
import { Prisma, Product } from "@prisma/client";
import { ProductItemRs } from "./response/product-item-rs";
import { toProductDetailRs, toProductItemRs } from "./mapper/product.mapper";
import { ResourceNotFoundError } from "../utils/error-types";
import { ProductsRs } from "./response/products-rs";
import { ProductDetailRs } from "./response/product-detail-rs";
import prisma from "../lib/prisma";

export class ProductService {
  private productRepository = new ProductRepository();

  async createProduct(data: Prisma.ProductCreateInput): Promise<ProductDetailRs> {
    const product = await this.productRepository.create(data);
    return toProductDetailRs(product);
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.getAll();
  }

  async getProductsPaginated(page = 1, limit = 10): Promise<ProductsRs> {
    const skip = (page - 1) * limit;

    const products = await prisma.product.findMany({
      skip,
      take: limit,
      orderBy: { id: "desc" },
    });
    const totalItems = await this.productRepository.countAll();

    const productItems: ProductItemRs[] = products.map(toProductItemRs);
    const totalPages = Math.ceil(totalItems / limit);

    return {
      products: productItems,
      currentPage: page,
      totalPages,
      totalItems,
    };
  }

  async getProductById(id: number): Promise<ProductItemRs> {
    const product = await this.productRepository.getById(id);
    if (!product) {
      throw new ResourceNotFoundError("Producto no encontrado.");
    }
    return toProductItemRs(product);
  }

  async updateProduct(id: number, data: Prisma.ProductUpdateInput): Promise<ProductDetailRs> {
    const existing = await this.productRepository.getById(id);
    if (!existing) {
      throw new ResourceNotFoundError("No se puede actualizar un producto inexistente.");
    }
    const updated = await this.productRepository.update(id, data);
    return toProductDetailRs(updated);
  }

  async deleteProduct(id: number): Promise<ProductDetailRs> {
    const existing = await this.productRepository.getById(id);
    if (!existing) {
      throw new ResourceNotFoundError("No se puede eliminar un producto inexistente.");
    }
    const deleted = await this.productRepository.delete(id);
    return toProductDetailRs(deleted);
  }
}
