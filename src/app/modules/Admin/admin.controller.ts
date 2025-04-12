import { Request, Response } from "express";

import pick from "../../../shared/pick";
import { adminFilterAbaleFields } from "./admin.constant";
import { AdminService } from "./admin.service";

const getAllFromDB = async (req: Request, res: Response) => {
  console.log(req.query);
  try {
    const filter = pick(req.query, adminFilterAbaleFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    console.log(options);
    const result = await AdminService.getAllFromDB(filter, options);

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
