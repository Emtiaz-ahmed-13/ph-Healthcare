import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllFromDB = async (params: any) => {
  const andConditions: Prisma.AdminWhereInput[] = [];

  const adminSerchAbleFields = ["name", "email"];

  if (params.searchTerm) {
    andConditions.push({
      OR: adminSerchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  console.dir(andConditions, { depth: Infinity });

  const whereCondition: Prisma.AdminWhereInput = { AND: andConditions };
  const result = await prisma.admin.findMany({
    where: whereCondition,
  });
  return result;
};

export const AdminService = {
  getAllFromDB,
};
