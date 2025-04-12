import { Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationhelpers";
import prisma from "../../../shared/prisma";

const adminSearchableFields: string[] = ["name", "email"];

const getAllFromDB = async (params: any, options: any) => {
  const {
    limit = 10,
    page = 1,
    sortBy,
    sortOrder,
  } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.AdminWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: adminSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    const filterConditions = Object.keys(filterData).map((key) => ({
      [key]: {
        contains: filterData[key],
        mode: "insensitive",
      },
    }));
    andConditions.push(...filterConditions);
  }

  const whereCondition: Prisma.AdminWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.admin.findMany({
    where: whereCondition,
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    ...(sortBy &&
      sortOrder && {
        orderBy: { [sortBy]: sortOrder },
      }),
  });

  return result;
};

export const AdminService = {
  getAllFromDB,
};
