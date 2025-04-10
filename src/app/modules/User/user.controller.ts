import { Request, Response } from "express";
import { UserService } from "./user.sevice";

const createAdmin = async (req: Request, res: Response) => {
  try {
    const adminData = {
      ...req.body,
      password: req.body.password || "admin123", // Default password if not provided
    };

    const result = await UserService.createAdmin(adminData);
    res.status(200).json({
      success: true,
      message: "Admin created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || "Failed to create admin",
      error: error,
    });
  }
};

export const UserController = {
  createAdmin,
};
