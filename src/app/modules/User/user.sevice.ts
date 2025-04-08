import { PrismaClient, UserRole, UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const createAdmin = async (data: any) => {
  const hasedPassowrd: string = await bcrypt.hash(data.password, 12);
  console.log(
    "🚀 ~ file: user.sevice.ts:10 ~ createAdmin ~ hasedPassowrd:",
    hasedPassowrd
  );

  const userData = {
    email: data.admin.email,
    password: hasedPassowrd,
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
    needPasswordChange: false,
  };

  const result = await prisma.$transaction(async (prisma) => {
    const createdUserData = await prisma.user.create({
      data: userData,
    });

    const createdAdminData = await prisma.admin.create({
      data: data.admin,
    });

    return createdAdminData;
  });

  return result;
};

export const UserService = {
  createAdmin,
};
