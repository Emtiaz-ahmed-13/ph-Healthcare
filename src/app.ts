import cors from "cors";
import express, { Application, Request, Response } from "express";

import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";

const app: Application = express();

// Apply CORS middleware globally

//parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define route
app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Ph Health care server",
  });
});

app.use('/api/v1',router);
app.use(globalErrorHandler);
export default app;
