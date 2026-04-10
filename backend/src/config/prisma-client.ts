import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { env } from "./env";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  pgPool?: Pool;
  prismaAdapter?: PrismaPg;
};

const pgPool =
  globalForPrisma.pgPool ??
  new Pool({
    connectionString: env.databaseUrl
  });

export { pgPool };

const prismaAdapter = globalForPrisma.prismaAdapter ?? new PrismaPg(pgPool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
    adapter: prismaAdapter
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.pgPool = pgPool;
  globalForPrisma.prismaAdapter = prismaAdapter;
}
