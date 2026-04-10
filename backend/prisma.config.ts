import "dotenv/config";
import { defineConfig } from "prisma/config";

if (!process.env.DATABASE_URL) {
  throw new Error(" DATABASE_URL is not set in your .env file");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL
  }
});















































// Prisma v7 uses prisma.config.ts for datasource configuration
// #this code below is the old code for connection and i left it here just incase we are having trouble connecting to postgress then recced to initial setup below from (angelo feaure)
// import "dotenv/config";
// import { defineConfig } from "prisma/config";

// export default defineConfig({
//   schema: "prisma/schema.prisma",
//   datasource: {
//     url: process.env.DATABASE_URL ?? ""
//   }
// });
