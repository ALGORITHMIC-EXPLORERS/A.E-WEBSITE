import { Router } from "express";

import { quizzesController } from "./quizzes.controller";

const learnerQuizzesRouter = Router();
learnerQuizzesRouter.get("/:quizId", quizzesController.getQuiz);
learnerQuizzesRouter.post("/:quizId/submit", quizzesController.submitQuiz);

const adminQuizzesRouter = Router();
adminQuizzesRouter.get("/", quizzesController.listAdminQuizzes);
adminQuizzesRouter.get("/:quizId", quizzesController.getAdminQuiz);
adminQuizzesRouter.post("/", quizzesController.createQuiz);
adminQuizzesRouter.patch("/:quizId", quizzesController.updateQuiz);
adminQuizzesRouter.delete("/:quizId", quizzesController.deleteQuiz);

export { adminQuizzesRouter, learnerQuizzesRouter };
