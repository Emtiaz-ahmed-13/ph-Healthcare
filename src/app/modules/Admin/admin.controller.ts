import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { AdminService } from "./admin.service";

const prisma = new PrismaClient();

const getAllFromDB = async (req: Request, res: Response) => {
  console.log(req.query);
  try {
    const result = await AdminService.getAllFromDB(req.query);

    res.status(200).json({
      success: true,
      message: "Admin data fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || "Failed to fetch admin data",
      error: error,
    });
  }
};

export const AdminController = {
  getAllFromDB,
};
