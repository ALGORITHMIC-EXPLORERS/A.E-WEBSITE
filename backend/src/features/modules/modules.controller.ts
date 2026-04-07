import { Request, Response } from "express";

import { AppError } from "../../shared/errors/app-error";
import { asyncHandler } from "../../shared/utils/async-handler";
import {
  optionalBoolean,
  optionalNumber,
  optionalString,
  requireArray,
  requireParam,
  requireString
} from "../../shared/validation/request";
import { modulesService } from "./modules.service";

function parseModulePayload(body: Record<string, unknown>) {
  const resourcesInput = body.resources
    ? requireArray<Record<string, unknown>>(body.resources, "resources").map(
        (resource, index) => ({
          title: requireString(resource.title, `resources[${index}].title`, {
            maxLength: 140
          }),
          type: requireString(resource.type, `resources[${index}].type`) as
            | "VIDEO"
            | "LINK"
            | "DOCUMENT"
            | "NOTE",
          url: optionalString(resource.url),
          content: optionalString(resource.content),
          sortOrder: optionalNumber(resource.sortOrder, `resources[${index}].sortOrder`)
        })
      )
    : undefined;

  return {
    title: requireString(body.title, "title", { maxLength: 160 }),
    slug: requireString(body.slug, "slug", { maxLength: 180 }).toLowerCase(),
    shortDescription: requireString(body.shortDescription, "shortDescription", {
      maxLength: 220
    }),
    description: requireString(body.description, "description"),
    order: optionalNumber(body.order, "order"),
    estimatedMinutes: optionalNumber(body.estimatedMinutes, "estimatedMinutes"),
    isPublished: optionalBoolean(body.isPublished),
    resources: resourcesInput
  };
}

function ensureUserId(req: Request): string {
  if (!req.user) {
    throw new AppError(401, "Authentication required.", "UNAUTHORIZED");
  }

  return req.user.sub;
}

export const modulesController = {
  listPublicModules: asyncHandler(async (_req: Request, res: Response) => {
    const modules = await modulesService.listPublicModules();

    return res.status(200).json({
      message: "Modules fetched successfully.",
      data: modules
    });
  }),

  getPublicModule: asyncHandler(async (req: Request, res: Response) => {
    const moduleItem = await modulesService.getPublicModuleBySlug({
      slug: requireParam(req.params.slug, "slug")
    });

    return res.status(200).json({
      message: "Module fetched successfully.",
      data: moduleItem
    });
  }),

  listMyModules: asyncHandler(async (req: Request, res: Response) => {
    const modules = await modulesService.listUserModules({
      userId: ensureUserId(req)
    });

    return res.status(200).json({
      message: "Learner modules fetched successfully.",
      data: modules
    });
  }),

  getMyModuleDetail: asyncHandler(async (req: Request, res: Response) => {
    const moduleItem = await modulesService.getUserModuleDetail({
      userId: ensureUserId(req),
      slug: requireParam(req.params.slug, "slug")
    });

    return res.status(200).json({
      message: "Module detail fetched successfully.",
      data: moduleItem
    });
  }),

  updateProgress: asyncHandler(async (req: Request, res: Response) => {
    const body = req.body as Record<string, unknown>;

    const progress = await modulesService.updateProgress({
      userId: ensureUserId(req),
      moduleId: requireParam(req.params.moduleId, "moduleId"),
      status: optionalString(body.status) as
        | "NOT_STARTED"
        | "IN_PROGRESS"
        | "COMPLETED"
        | undefined,
      progressPercent: optionalNumber(body.progressPercent, "progressPercent")
    });

    return res.status(200).json({
      message: "Module progress updated successfully.",
      data: progress
    });
  }),

  listAdminModules: asyncHandler(async (_req: Request, res: Response) => {
    const modules = await modulesService.listAdminModules();

    return res.status(200).json({
      message: "Admin modules fetched successfully.",
      data: modules
    });
  }),

  getAdminModule: asyncHandler(async (req: Request, res: Response) => {
    const moduleItem = await modulesService.getAdminModuleById({
      moduleId: requireParam(req.params.moduleId, "moduleId")
    });

    return res.status(200).json({
      message: "Admin module fetched successfully.",
      data: moduleItem
    });
  }),

  createModule: asyncHandler(async (req: Request, res: Response) => {
    const moduleItem = await modulesService.createModule(
      parseModulePayload(req.body as Record<string, unknown>)
    );

    return res.status(201).json({
      message: "Module created successfully.",
      data: moduleItem
    });
  }),

  updateModule: asyncHandler(async (req: Request, res: Response) => {
    const moduleItem = await modulesService.updateModule({
      moduleId: requireParam(req.params.moduleId, "moduleId"),
      ...parseModulePayload(req.body as Record<string, unknown>)
    });

    return res.status(200).json({
      message: "Module updated successfully.",
      data: moduleItem
    });
  }),

  deleteModule: asyncHandler(async (req: Request, res: Response) => {
    await modulesService.deleteModule({
      moduleId: requireParam(req.params.moduleId, "moduleId")
    });

    return res.status(200).json({
      message: "Module deleted successfully."
    });
  })
};
