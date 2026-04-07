import { Request, Response } from "express";

import { asyncHandler } from "../../shared/utils/async-handler";
import {
  optionalBoolean,
  optionalString,
  requireParam,
  requireString
} from "../../shared/validation/request";
import { productsService } from "./products.service";

function parseProductPayload(body: Record<string, unknown>) {
  return {
    name: requireString(body.name, "name", { maxLength: 160 }),
    slug: requireString(body.slug, "slug", { maxLength: 180 }).toLowerCase(),
    description: requireString(body.description, "description"),
    link: requireString(body.link, "link"),
    imageUrl: optionalString(body.imageUrl),
    isPublished: optionalBoolean(body.isPublished)
  };
}

export const productsController = {
  listPublicProducts: asyncHandler(async (_req: Request, res: Response) => {
    const products = await productsService.listPublicProducts();

    return res.status(200).json({
      message: "Products fetched successfully.",
      data: products
    });
  }),

  getPublicProduct: asyncHandler(async (req: Request, res: Response) => {
    const product = await productsService.getPublicProductBySlug({
      slug: requireParam(req.params.slug, "slug")
    });

    return res.status(200).json({
      message: "Product fetched successfully.",
      data: product
    });
  }),

  listAdminProducts: asyncHandler(async (_req: Request, res: Response) => {
    const products = await productsService.listAdminProducts();

    return res.status(200).json({
      message: "Products fetched successfully.",
      data: products
    });
  }),

  getAdminProduct: asyncHandler(async (req: Request, res: Response) => {
    const product = await productsService.getAdminProductById({
      productId: requireParam(req.params.productId, "productId")
    });

    return res.status(200).json({
      message: "Product fetched successfully.",
      data: product
    });
  }),

  createProduct: asyncHandler(async (req: Request, res: Response) => {
    const product = await productsService.createProduct(
      parseProductPayload(req.body as Record<string, unknown>)
    );

    return res.status(201).json({
      message: "Product created successfully.",
      data: product
    });
  }),

  updateProduct: asyncHandler(async (req: Request, res: Response) => {
    const product = await productsService.updateProduct({
      productId: requireParam(req.params.productId, "productId"),
      ...parseProductPayload(req.body as Record<string, unknown>)
    });

    return res.status(200).json({
      message: "Product updated successfully.",
      data: product
    });
  }),

  deleteProduct: asyncHandler(async (req: Request, res: Response) => {
    await productsService.deleteProduct({
      productId: requireParam(req.params.productId, "productId")
    });

    return res.status(200).json({
      message: "Product deleted successfully."
    });
  })
};
