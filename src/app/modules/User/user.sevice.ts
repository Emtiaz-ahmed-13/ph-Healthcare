import { UserRole, UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";

const createAdmin = async (data: any) => {
  // Hash the password
  const hashedPassword: string = await bcrypt.hash(data.password, 12);

  // Prepare user data
  const userData = {
    email: data.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
  };

  // Use transaction to create user and admin
  const result = await prisma.$transaction(async (transactionClient) => {
    // Create user in the user table
    const createdUser = await transactionClient.user.create({
      data: userData,
    });

    // Create admin data in the admin table
    const createdAdminData = await transactionClient.admin.create({
      data: {
        name: data.admin.name,
        email: data.admin.email,
        contactNumber: data.admin.contactNumber,
        user: { connect: { email: createdUser.email } }, // Connect the admin with the user via email
      },
    });

    // Return the created admin data
    return createdAdminData;
  });

  return result; // Return the created admin object
};

export const UserService = {
  createAdmin,
};
