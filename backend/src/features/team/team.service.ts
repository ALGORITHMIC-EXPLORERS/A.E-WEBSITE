export interface UpsertTeamMemberInput {
  fullName: string;
  roleTitle: string;
  bio: string;
  imageUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  sortOrder?: number;
  isVisible?: boolean;
}

export const teamService = {
  listPublicTeamMembers: async () =>
    "This is teamService.listPublicTeamMembers endpoint.",

  listAdminTeamMembers: async () =>
    "This is teamService.listAdminTeamMembers endpoint.",

  getTeamMemberById: async (_input: { teamMemberId: string }) =>
    "This is teamService.getTeamMemberById endpoint.",

  createTeamMember: async (_input: UpsertTeamMemberInput) =>
    "This is teamService.createTeamMember endpoint.",

  updateTeamMember: async (_input: { teamMemberId: string } & UpsertTeamMemberInput) =>
    "This is teamService.updateTeamMember endpoint.",

  deleteTeamMember: async (_input: { teamMemberId: string }) =>
    "This is teamService.deleteTeamMember endpoint."
};
