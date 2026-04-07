import { Request, Response } from "express";

import { asyncHandler } from "../../shared/utils/async-handler";
import {
  optionalBoolean,
  optionalNumber,
  optionalString,
  requireParam,
  requireString
} from "../../shared/validation/request";
import { teamService } from "./team.service";

function parseTeamMemberPayload(body: Record<string, unknown>) {
  return {
    fullName: requireString(body.fullName, "fullName", { maxLength: 140 }),
    roleTitle: requireString(body.roleTitle, "roleTitle", { maxLength: 140 }),
    bio: requireString(body.bio, "bio", { maxLength: 2000 }),
    imageUrl: optionalString(body.imageUrl),
    linkedinUrl: optionalString(body.linkedinUrl),
    twitterUrl: optionalString(body.twitterUrl),
    sortOrder: optionalNumber(body.sortOrder, "sortOrder"),
    isVisible: optionalBoolean(body.isVisible)
  };
}

export const teamController = {
  listPublic: asyncHandler(async (_req: Request, res: Response) => {
    const members = await teamService.listPublicTeamMembers();

    return res.status(200).json({
      message: "Team members fetched successfully.",
      data: members
    });
  }),

  listAdmin: asyncHandler(async (_req: Request, res: Response) => {
    const members = await teamService.listAdminTeamMembers();

    return res.status(200).json({
      message: "Team members fetched successfully.",
      data: members
    });
  }),

  getOne: asyncHandler(async (req: Request, res: Response) => {
    const member = await teamService.getTeamMemberById({
      teamMemberId: requireParam(req.params.teamMemberId, "teamMemberId")
    });

    return res.status(200).json({
      message: "Team member fetched successfully.",
      data: member
    });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const member = await teamService.createTeamMember(
      parseTeamMemberPayload(req.body as Record<string, unknown>)
    );

    return res.status(201).json({
      message: "Team member created successfully.",
      data: member
    });
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const member = await teamService.updateTeamMember({
      teamMemberId: requireParam(req.params.teamMemberId, "teamMemberId"),
      ...parseTeamMemberPayload(req.body as Record<string, unknown>)
    });

    return res.status(200).json({
      message: "Team member updated successfully.",
      data: member
    });
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    await teamService.deleteTeamMember({
      teamMemberId: requireParam(req.params.teamMemberId, "teamMemberId")
    });

    return res.status(200).json({
      message: "Team member deleted successfully."
    });
  })
};
