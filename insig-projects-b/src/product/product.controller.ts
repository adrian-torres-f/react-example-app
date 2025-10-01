import { Request, Response, NextFunction, Router } from "express";
import { ProductService } from "./product.service";
import { ApiResponse } from "../utils/api-response";
import { productCreateRq } from "./request/product-create-rq";
import { validateRequest } from "../utils/validate-request";
import { productUpdateRq } from "./request/product-update-rq";
import { ProductItemRs } from "./response/product-item-rs";
import { ProductsRs } from "./response/products-rs";
import { ProductDetailRs } from "./response/product-detail-rs";

const router = Router();
const productService = new ProductService();

//  POST /products
router.post(
    "/",
    productCreateRq(),
    validateRequest("Datos inválidos"),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newProduct = await productService.createProduct(req.body);

            const response: ApiResponse<ProductDetailRs> = {
                status: "success",
                message: "Producto creado exitosamente",
                data: newProduct,
            };

            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    }
);

//  GET /products (todos los productos sin paginación)
router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productService.getAllProducts();

        const response: ApiResponse<ProductDetailRs[]> = {
            status: "success",
            message: "Productos obtenidos correctamente",
            data: products.map((p) => ({
                id: p.id,
                name: p.name,
                description: p.description,
                stock: p.stock,
            })),
        };

        res.json(response);
    } catch (error) {
        next(error);
    }
});

//  GET /products/paginated?page=1&limit=10 (productos paginados)
router.get("/paginated", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const paginatedProducts = await productService.getProductsPaginated(page, limit);

        const response: ApiResponse<ProductsRs> = {
            status: "success",
            message: "Productos paginados obtenidos correctamente",
            data: paginatedProducts,
        };

        res.json(response);
    } catch (error) {
        next(error);
    }
});

//  GET /products/:id
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const product = await productService.getProductById(id);

        const response: ApiResponse<ProductItemRs> = {
            status: "success",
            message: "Producto encontrado",
            data: product,
        };

        res.json(response);
    } catch (error) {
        next(error);
    }
});

//  PUT /products/:id
router.put(
    "/:id",
    productUpdateRq(),
    validateRequest("Datos inválidos"),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10);
            const updated = await productService.updateProduct(id, req.body);

            const response: ApiResponse<ProductDetailRs> = {
                status: "success",
                message: "Producto actualizado correctamente",
                data: updated,
            };

            res.json(response);
        } catch (error) {
            next(error);
        }
    }
);

//  DELETE /products/:id
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const deleted = await productService.deleteProduct(id);

        const response: ApiResponse<ProductDetailRs> = {
            status: "success",
            message: "Producto eliminado correctamente",
            data: deleted,
        };

        res.json(response);
    } catch (error) {
        next(error);
    }
});

export default router;
