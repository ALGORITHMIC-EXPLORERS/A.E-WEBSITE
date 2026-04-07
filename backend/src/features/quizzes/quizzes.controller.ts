import { Request, Response } from "express";

import { AppError } from "../../shared/errors/app-error";
import { asyncHandler } from "../../shared/utils/async-handler";
import {
  optionalBoolean,
  optionalNumber,
  optionalString,
  requireArray,
  requireBoolean,
  requireParam,
  requireString
} from "../../shared/validation/request";
import { quizzesService } from "./quizzes.service";

function ensureUserId(req: Request): string {
  if (!req.user) {
    throw new AppError(401, "Authentication required.", "UNAUTHORIZED");
  }

  return req.user.sub;
}

function parseQuizPayload(body: Record<string, unknown>) {
  return {
    moduleId: requireString(body.moduleId, "moduleId"),
    title: requireString(body.title, "title", { maxLength: 160 }),
    instructions: optionalString(body.instructions),
    passingScore: optionalNumber(body.passingScore, "passingScore"),
    timeLimitMinutes: optionalNumber(body.timeLimitMinutes, "timeLimitMinutes"),
    isPublished: optionalBoolean(body.isPublished),
    questions: requireArray<Record<string, unknown>>(body.questions, "questions").map(
      (question, questionIndex) => ({
        prompt: requireString(question.prompt, `questions[${questionIndex}].prompt`),
        explanation: optionalString(question.explanation),
        sortOrder: optionalNumber(
          question.sortOrder,
          `questions[${questionIndex}].sortOrder`
        ),
        options: requireArray<Record<string, unknown>>(
          question.options,
          `questions[${questionIndex}].options`
        ).map((option, optionIndex) => ({
          label: requireString(
            option.label,
            `questions[${questionIndex}].options[${optionIndex}].label`
          ),
          isCorrect: requireBoolean(
            option.isCorrect,
            `questions[${questionIndex}].options[${optionIndex}].isCorrect`
          ),
          sortOrder: optionalNumber(
            option.sortOrder,
            `questions[${questionIndex}].options[${optionIndex}].sortOrder`
          )
        }))
      })
    )
  };
}

export const quizzesController = {
  getQuiz: asyncHandler(async (req: Request, res: Response) => {
    const quiz = await quizzesService.getQuizForLearner({
      quizId: requireParam(req.params.quizId, "quizId"),
      userId: ensureUserId(req)
    });

    return res.status(200).json({
      message: "Quiz fetched successfully.",
      data: quiz
    });
  }),

  submitQuiz: asyncHandler(async (req: Request, res: Response) => {
    const body = req.body as Record<string, unknown>;
    const answers = requireArray<Record<string, unknown>>(body.answers, "answers").map(
      (answer, index) => ({
        questionId: requireString(answer.questionId, `answers[${index}].questionId`),
        selectedOptionId: optionalString(answer.selectedOptionId)
      })
    );

    const result = await quizzesService.submitQuiz({
      quizId: requireParam(req.params.quizId, "quizId"),
      userId: ensureUserId(req),
      answers
    });

    return res.status(200).json({
      message: "Quiz submitted successfully.",
      data: result
    });
  }),

  listAdminQuizzes: asyncHandler(async (_req: Request, res: Response) => {
    const quizzes = await quizzesService.listAdminQuizzes();

    return res.status(200).json({
      message: "Quizzes fetched successfully.",
      data: quizzes
    });
  }),

  getAdminQuiz: asyncHandler(async (req: Request, res: Response) => {
    const quiz = await quizzesService.getAdminQuizById({
      quizId: requireParam(req.params.quizId, "quizId")
    });

    return res.status(200).json({
      message: "Quiz fetched successfully.",
      data: quiz
    });
  }),

  createQuiz: asyncHandler(async (req: Request, res: Response) => {
    const quiz = await quizzesService.createQuiz(
      parseQuizPayload(req.body as Record<string, unknown>)
    );

    return res.status(201).json({
      message: "Quiz created successfully.",
      data: quiz
    });
  }),

  updateQuiz: asyncHandler(async (req: Request, res: Response) => {
    const quiz = await quizzesService.updateQuiz({
      quizId: requireParam(req.params.quizId, "quizId"),
      ...parseQuizPayload(req.body as Record<string, unknown>)
    });

    return res.status(200).json({
      message: "Quiz updated successfully.",
      data: quiz
    });
  }),

  deleteQuiz: asyncHandler(async (req: Request, res: Response) => {
    await quizzesService.deleteQuiz({
      quizId: requireParam(req.params.quizId, "quizId")
    });

    return res.status(200).json({
      message: "Quiz deleted successfully."
    });
  })
};
