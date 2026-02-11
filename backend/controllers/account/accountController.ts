import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { errorResponse, successResponse } from "../../utils/apiResponse";
import { DeleteAccountSchema } from "../../schema/accountSchema";
import bcrypt from "bcryptjs";
import { ChangePasswordSchema } from "../../schema/accountSchema";

const deleteAccount = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return errorResponse(res, "Unauthorized", 401);
    }

    // Validate body
    const parsed = DeleteAccountSchema.safeParse(req.body);
    if (!parsed.success) {
      return errorResponse(res, "Invalid input", 400);
    }

    const { reasons } = parsed.data;

    // Optional: store delete reasons
    await prisma.accountDeletion.create({
      data: {
        userId: user.userId,
        reasons: reasons ?? [],
      },
    });

    // Soft delete user
    await prisma.user.update({
      where: { id: user.userId },
      data: {
        deletedAt: new Date(),
      },
    });

    return successResponse(res, null, "Account deleted successfully");
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Failed to delete account", 500);
  }
};

const changePassword = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return errorResponse(res, "Unauthorized", 401);

    // Validate request body
    const parsed = ChangePasswordSchema.safeParse(req.body);
    if (!parsed.success) {
      return errorResponse(res, parsed.error.issues[0].message, 400);
    }

    const { old_password, new_password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return errorResponse(res, "User not found", 404);

    const isMatch = await bcrypt.compare(old_password, user.password);
    if (!isMatch) return errorResponse(res, "Old password is incorrect", 401);

    const hashedPassword = await bcrypt.hash(new_password, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return successResponse(res, null, "Password changed successfully");
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Failed to change password", 500);
  }
};

module.exports = { deleteAccount, changePassword };
