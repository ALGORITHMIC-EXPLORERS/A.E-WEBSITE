import { Router } from "express";

import { testimonialsController } from "./testimonials.controller";

const publicTestimonialsRouter = Router();
publicTestimonialsRouter.get("/", testimonialsController.listApproved);
publicTestimonialsRouter.post("/", testimonialsController.submit);

const adminTestimonialsRouter = Router();
adminTestimonialsRouter.get("/", testimonialsController.listAdmin);
adminTestimonialsRouter.patch("/:testimonialId/status", testimonialsController.updateStatus);
adminTestimonialsRouter.delete("/:testimonialId", testimonialsController.delete);

export { adminTestimonialsRouter, publicTestimonialsRouter };
