import { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import { openApiSpec } from "./openapi";

export function setupSwaggerDocs(app: Express): void {
  app.get("/api/docs.json", (_req: Request, res: Response) => {
    res.type("application/json").send(JSON.stringify(openApiSpec));
  });

  app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(openApiSpec, {
      explorer: true,
      customSiteTitle: "AE Backend API Docs",
      swaggerOptions: {
        persistAuthorization: true,
        withCredentials: true
      }
    })
  );
}