import { app } from "./app";
import { env } from "./config/env";
import { prisma } from "./config/prisma-client";

async function startServer(): Promise<void> {
  await prisma.$connect();
  console.log("Connected to PostgreSQL through Prisma.");

  app.listen(env.port, () => {
    console.log(`Server is running on port ${env.port}.`);
  });
}

startServer().catch(async (error) => {
  console.error("Failed to start server:", error);
  await prisma.$disconnect();
  process.exit(1);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
