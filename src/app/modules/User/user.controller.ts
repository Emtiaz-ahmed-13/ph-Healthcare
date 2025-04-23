import { Request, Response } from "express";
import { UserService } from "./user.sevice";

const createAdmin = async (req: Request, res: Response) => {
  try {
    const result = await UserService.createAdmin(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error: any) {
    res
      .status(400)
      .json({ success: false, message: error.message, error: error });
  }
};

export const userController = {
  createAdmin,
};
