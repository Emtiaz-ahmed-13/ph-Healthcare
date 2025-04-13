import cors from "cors";
import express, { Application, Request, Response } from "express";

import { AdminRoutes } from "./app/modules/Admin/admin.routes";
import { UserRoutes } from "./app/modules/User/user.routes";

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

app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/admin", AdminRoutes);

export default app;
