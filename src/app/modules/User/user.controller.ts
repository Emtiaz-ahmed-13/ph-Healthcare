import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserService } from "./user.sevice";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const adminData = {
    ...req.body,
    password: req.body.password || "admin123",
  };

  const result = await UserService.createAdmin(adminData);
  res.status(200).json({
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});

export const UserController = {
  createAdmin,
};
