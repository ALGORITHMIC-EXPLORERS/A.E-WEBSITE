export const testimonialsService = {
  listApprovedTestimonials: async () =>
    "This is testimonialsService.listApprovedTestimonials endpoint.",

  submitTestimonial: async (_input: {
    userId?: string;
    name: string;
    title?: string;
    company?: string;
    content: string;
    rating?: number;
  }) => "This is testimonialsService.submitTestimonial endpoint.",

  listAdminTestimonials: async () =>
    "This is testimonialsService.listAdminTestimonials endpoint.",

  updateTestimonialStatus: async (_input: {
    testimonialId: string;
    status: "APPROVED" | "REJECTED" | "PENDING";
    isFeatured?: boolean;
    approvedById?: string;
  }) => "This is testimonialsService.updateTestimonialStatus endpoint.",

  deleteTestimonial: async (_input: { testimonialId: string }) =>
    "This is testimonialsService.deleteTestimonial endpoint."
};
