import { prisma } from "../../config/prisma-client";

export interface LeaderboardInput {
  limit?: number;
  offset?: number;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  averageScore: number;
  totalAttempts: number;
  modulesCompleted: number;
  isTopThree: boolean;
}

export const leaderboardService = {
  getLeaderboard: async (input: LeaderboardInput = {}): Promise<LeaderboardEntry[]> => {
    const limit = Math.min(input.limit ?? 50, 100); // Max 100
    const offset = input.offset ?? 0;

    // 1. Get ACTIVE users only with quiz and module data from db
    const users = await prisma.user.findMany({
      where: {
        status: "ACTIVE" // its Only for  active users in db
      },
      select: {
        id: true,
        username: true,
        quizAttempts: {
          select: {
            score: true
          }
        },
        moduleProgresses: {
          where: {
            status: "COMPLETED"
          },
          select: {
            id: true
          }
        }
      }
    });

    // 2. Transform and calculate metrics
    const leaderboard = users
      .map((user) => {
        const attempts = user.quizAttempts;
        const totalScore = attempts.reduce((sum, attempt) => sum + attempt.score, 0);
        const averageScore = attempts.length > 0 ? Math.round(totalScore / attempts.length) : 0;
        const modulesCompleted = user.moduleProgresses.length;

        return {
          userId: user.id,
          username: user.username,
          averageScore, // Better metric than total
          totalAttempts: attempts.length,
          modulesCompleted
        };
      })
      // 3. Sort by average score (descending), then by attempts
      .sort((a, b) => {
        if (b.averageScore !== a.averageScore) {
          return b.averageScore - a.averageScore;
        }
        return b.totalAttempts - a.totalAttempts;
      });

    // 4. Add rank + pagination + top 3 flag
    const rankedLeaderboard = leaderboard
      .slice(offset, offset + limit)
      .map((user, index) => ({
        rank: offset + index + 1,
        ...user,
        isTopThree: offset + index < 3
      }));

    return rankedLeaderboard;
  }
};