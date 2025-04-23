import { UserRole, UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";

const createAdmin = async (data: any) => {
  const hashedPassword: string = await bcrypt.hash(data.password, 12);

  const userData = {
    email: data.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const createdUser = await transactionClient.user.create({
      data: userData,
    });
    console.log("Created user:", createdUser);

    const createdAdminData = await transactionClient.admin.create({
      data: {
        name: data.admin.name,
        contactNumber: data.admin.contactNumber,
        user: {
          connect: {
            id: createdUser.id,
          },
        },
      },
    });
    return createdAdminData;
  });

  return result;
};

export const UserService = {
  createAdmin,
};
