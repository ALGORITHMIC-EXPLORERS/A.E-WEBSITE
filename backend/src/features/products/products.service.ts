export interface UpsertProductInput {
  name: string;
  slug: string;
  description: string;
  link: string;
  imageUrl?: string;
  isPublished?: boolean;
}

export const productsService = {
  listPublicProducts: async () => "This is productsService.listPublicProducts endpoint.",

  getPublicProductBySlug: async (_input: { slug: string }) =>
    "This is productsService.getPublicProductBySlug endpoint.",

  listAdminProducts: async () => "This is productsService.listAdminProducts endpoint.",

  getAdminProductById: async (_input: { productId: string }) =>
    "This is productsService.getAdminProductById endpoint.",

  createProduct: async (_input: UpsertProductInput) =>
    "This is productsService.createProduct endpoint.",

  updateProduct: async (_input: { productId: string } & UpsertProductInput) =>
    "This is productsService.updateProduct endpoint.",

  deleteProduct: async (_input: { productId: string }) =>
    "This is productsService.deleteProduct endpoint."
};
