// user.routes.ts
import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.post(
  "/",
  // auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  userController.createAdmin // Make sure this matches the controller method
);

export const UserRoutes = router;
