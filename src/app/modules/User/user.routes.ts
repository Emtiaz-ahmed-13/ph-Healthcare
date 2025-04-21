import { UserRole } from "@prisma/client";
import express, { Request, Response } from "express";
import auth from "../../middlewares/auth";
import { UserController } from "./user.controller";
import { UserService } from "./user.sevice";
const router = express.Router();

router.post(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  UserController.createAdmin
);

// Special route for creating the first admin (remove this after creating the first admin)
router.post("/create-first-admin", UserController.createAdmin);

// Test endpoint - simple route with no auth middleware
router.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Test endpoint working!",
  });
});

// Super simple admin creation - bypassing controller
router.post("/simple-admin", async (req: Request, res: Response) => {
  try {
    const adminData = {
      password: req.body.password || "admin123",
      admin: {
        name: req.body.name,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
      },
    };

    const result = await UserService.createAdmin(adminData);

    res.status(200).json({
      success: true,
      message: "Admin created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create admin",
      error: error,
    });
  }
});

export const UserRoutes = router;
