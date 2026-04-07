import { Request, Response } from "express";

import { AppError } from "../../shared/errors/app-error";
import { asyncHandler } from "../../shared/utils/async-handler";
import {
  optionalBoolean,
  optionalNumber,
  optionalString,
  requireParam,
  requireString
} from "../../shared/validation/request";
import { testimonialsService } from "./testimonials.service";

export const testimonialsController = {
  listApproved: asyncHandler(async (_req: Request, res: Response) => {
    const testimonials = await testimonialsService.listApprovedTestimonials();

    return res.status(200).json({
      message: "Testimonials fetched successfully.",
      data: testimonials
    });
  }),

  submit: asyncHandler(async (req: Request, res: Response) => {
    const body = req.body as Record<string, unknown>;
    const testimonial = await testimonialsService.submitTestimonial({
      userId: req.user?.sub,
      name: requireString(body.name, "name", { maxLength: 120 }),
      title: optionalString(body.title),
      company: optionalString(body.company),
      content: requireString(body.content, "content", { maxLength: 1500 }),
      rating: optionalNumber(body.rating, "rating")
    });

    return res.status(201).json({
      message: "Testimonial submitted successfully.",
      data: testimonial
    });
  }),

  listAdmin: asyncHandler(async (_req: Request, res: Response) => {
    const testimonials = await testimonialsService.listAdminTestimonials();

    return res.status(200).json({
      message: "Testimonials fetched successfully.",
      data: testimonials
    });
  }),

  updateStatus: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError(401, "Authentication required.", "UNAUTHORIZED");
    }

    const body = req.body as Record<string, unknown>;
    const status = requireString(body.status, "status") as
      | "APPROVED"
      | "REJECTED"
      | "PENDING";

    const testimonial = await testimonialsService.updateTestimonialStatus({
      testimonialId: requireParam(req.params.testimonialId, "testimonialId"),
      status,
      isFeatured: optionalBoolean(body.isFeatured),
      approvedById: req.user.sub
    });

    return res.status(200).json({
      message: "Testimonial updated successfully.",
      data: testimonial
    });
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    await testimonialsService.deleteTestimonial({
      testimonialId: requireParam(req.params.testimonialId, "testimonialId")
    });

    return res.status(200).json({
      message: "Testimonial deleted successfully."
    });
  })
};
