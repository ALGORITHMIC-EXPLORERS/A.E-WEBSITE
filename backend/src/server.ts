import { app } from "./app";
import { env } from "./config/env";
import { pgPool, prisma } from "./config/prisma-client";

async function startServer(): Promise<void> {
  await prisma.$connect();
  console.log("Connected to PostgreSQL through Prisma.");

  const server = app.listen(env.port, () => {
    const baseUrl = env.appBaseUrl.replace(/\/$/, "");
    console.log(`Server is running on port ${env.port}.`);
    console.log(`API Base URL: ${baseUrl}`);
    console.log(`Swagger UI: ${baseUrl}/api/docs`);
    console.log(`OpenAPI JSON: ${baseUrl}/api/docs.json`);
  });

  server.on("error", async (error: NodeJS.ErrnoException) => {
    if (error.code === "EADDRINUSE") {
      console.error(`Port ${env.port} is already in use. Update PORT in .env and retry.`);
    } else {
      console.error("Server failed to start:", error);
    }

    await prisma.$disconnect();
    await pgPool.end();
    process.exit(1);
  });

  const shutdown = async (signal: string) => {
    console.log(`Received ${signal}. Closing server gracefully.`);
    server.close(async () => {
      await prisma.$disconnect();
      await pgPool.end();
      process.exit(0);
    });
  };

  process.on("SIGINT", () => {
    void shutdown("SIGINT");
  });

  process.on("SIGTERM", () => {
    void shutdown("SIGTERM");
  });
}

startServer().catch(async (error) => {
  console.error("Failed to start server:", error);
  await prisma.$disconnect();
  await pgPool.end();
  process.exit(1);
});
