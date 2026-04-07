import { Router } from "express";

import { productsController } from "./products.controller";

const publicProductsRouter = Router();
publicProductsRouter.get("/", productsController.listPublicProducts);
publicProductsRouter.get("/:slug", productsController.getPublicProduct);

const adminProductsRouter = Router();
adminProductsRouter.get("/", productsController.listAdminProducts);
adminProductsRouter.get("/:productId", productsController.getAdminProduct);
adminProductsRouter.post("/", productsController.createProduct);
adminProductsRouter.patch("/:productId", productsController.updateProduct);
adminProductsRouter.delete("/:productId", productsController.deleteProduct);

export { adminProductsRouter, publicProductsRouter };
