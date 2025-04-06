import cors from "cors";
import express, { Application, Request, Response } from "express";

const app: Application = express();

// Apply CORS middleware globally
app.use(cors());

// Define route
app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Ph Health care server",
  });
});

export default app;
