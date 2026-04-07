export interface UpsertModuleInput {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  order?: number;
  estimatedMinutes?: number;
  isPublished?: boolean;
  resources?: Array<{
    title: string;
    type: "VIDEO" | "LINK" | "DOCUMENT" | "NOTE";
    url?: string;
    content?: string;
    sortOrder?: number;
  }>;
}

export const modulesService = {
  listPublicModules: async () => "This is modulesService.listPublicModules endpoint.",

  getPublicModuleBySlug: async (_input: { slug: string }) =>
    "This is modulesService.getPublicModuleBySlug endpoint.",

  listUserModules: async (_input: { userId: string }) =>
    "This is modulesService.listUserModules endpoint.",

  getUserModuleDetail: async (_input: { userId: string; slug: string }) =>
    "This is modulesService.getUserModuleDetail endpoint.",

  updateProgress: async (_input: {
    userId: string;
    moduleId: string;
    status?: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
    progressPercent?: number;
  }) => "This is modulesService.updateProgress endpoint.",

  listAdminModules: async () => "This is modulesService.listAdminModules endpoint.",

  getAdminModuleById: async (_input: { moduleId: string }) =>
    "This is modulesService.getAdminModuleById endpoint.",

  createModule: async (_input: UpsertModuleInput) =>
    "This is modulesService.createModule endpoint.",

  updateModule: async (_input: { moduleId: string } & UpsertModuleInput) =>
    "This is modulesService.updateModule endpoint.",

  deleteModule: async (_input: { moduleId: string }) =>
    "This is modulesService.deleteModule endpoint."
};
