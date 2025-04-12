import { UserRole, UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
const createAdmin = async (data: any) => {
  const hashedPassword: string = await bcrypt.hash(data.password, 12);

  const userData = {
    email: data.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
    needPasswordChange: false,
  };

  const result = await prisma.$transaction(async (prisma) => {
    const createdUserData = await prisma.user.create({
      data: userData,
    });

    const createdAdminData = await prisma.admin.create({
      data: {
        ...data,
        userId: createdUserData.id,
      },
    });

    return createdAdminData;
  });

  return result;
};

export const UserService = {
  createAdmin,
};
