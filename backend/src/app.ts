import cors from "cors";
import express from "express";

import { env } from "./config/env";
import { setupSwaggerDocs } from "./docs/swagger";
import { errorHandler } from "./middlewares/error-handler";
import { notFoundHandler } from "./middlewares/not-found";
import { responseFormatter } from "./middlewares/response-formatter";
import { apiRouter } from "./routes";

const app = express();

app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");
setupSwaggerDocs(app);
app.use(responseFormatter);

app.get("/", (_req, res) => {
  return res.status(200).json({
    message: "AE Website backend is running."
  });
});

app.use("/api", apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export { app };
