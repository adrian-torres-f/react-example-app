import { PrismaClient, Product, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export class ProductRepository {
  async getAll(): Promise<Product[]> {
    return await prisma.product.findMany({
      orderBy: { id: "desc" },
    });
  }

  async getMany(params: { skip: number; take: number; where?: Prisma.ProductWhereInput }): Promise<Product[]> {
    return await prisma.product.findMany({
      skip: params.skip,
      take: params.take,
      where: params.where,
      orderBy: { id: "desc" },
    });
  }

  async getById(id: number): Promise<Product | null> {
    return await prisma.product.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    return await prisma.product.create({
      data: {
        ...data,
        stock: Number(data.stock),
      },
    });
  }

  async update(id: number, data: Prisma.ProductUpdateInput): Promise<Product> {
    return await prisma.product.update({
      where: { id },
      data: {
        ...data,
        stock: data.stock !== undefined ? Number(data.stock) : undefined,
      },
    });
  }

  async delete(id: number): Promise<Product> {
    return await prisma.product.delete({
      where: { id },
    });
  }

  async countAll(where?: Prisma.ProductWhereInput): Promise<number> {
    return await prisma.product.count({ where });
  }
}
