import type { Request, Response } from "express";

import { prisma } from "../../lib/prisma";
import { Resend } from "resend";
import { errorResponse, successResponse } from "../../utils/apiResponse";
import { Prisma } from "@prisma/client";

const {
  AdminSchema,
  CareerSchema,
  PartnerSchema,
  UserRegisterSchema,
} = require("../../schema/registerSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const resend = new Resend(process.env.RESEND_API_KEY);

type Role = "USER" | "PARTNER" | "CAREER" | "ADMIN";

const register = async (req: Request, res: Response) => {
  const { role } = req.body;

  const schemaByRole: Record<Role, any> = {
    USER: UserRegisterSchema,
    PARTNER: PartnerSchema,
    CAREER: CareerSchema,
    ADMIN: AdminSchema,
  };

  if (!["USER", "PARTNER", "CAREER", "ADMIN"].includes(role)) {
    return res.status(400).json({ message: "Invalid role specified." });
  }

  const schema = schemaByRole[role as Role];

  try {
    schema.parse(req.body);
  } catch (err) {
    return res.status(400).json({ message: "Invalid input", error: err });
  }

  try {
    const { email, password, name, phone, ...extra } = req.body;

    // ✅ Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message:
          "Email is already in use. Please use a different email or log in.",
      });
    }
    // end
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        gender: role === "CAREER" ? extra.gender : undefined,
        role,

        userData: role === "USER" ? { create: { name, phone } } : undefined,

        partner:
          role === "PARTNER"
            ? {
                create: {
                  first_name: extra.first_name,
                  last_name: extra.last_name,
                  phone,
                  portfolio: extra.portfolio,
                  artisan: extra.artisan,
                  do_you_train: extra.do_you_train,
                  willing_to_train: extra.willing_to_train,
                },
              }
            : undefined,

        career:
          role === "CAREER"
            ? {
                create: {
                  first_name: extra.first_name,
                  last_name: extra.last_name,
                  phone,
                },
              }
            : undefined,

        admin:
          role === "ADMIN"
            ? {
                create: {
                  name,
                },
              }
            : undefined,
      },
    });
    const { password: _removedPassword, ...safeUser } = user;

    return successResponse(res, safeUser, "User registered successfully", 201);
  } catch (error) {
    return errorResponse(res, "Registration failed", 500);
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.deletedAt) {
      return errorResponse(res, "Invalid email or password", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return errorResponse(res, "Invalid email or password", 401);
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" },
    );

    return successResponse(res, { token, role: user.role }, "Login successful");
  } catch (error) {
    return errorResponse(res, "Login failed", 500);
  }
};

console.log("ENV CHECK:", {
  NODE_ENV: process.env.NODE_ENV,
  RESEND_API_KEY_EXISTS: !!process.env.RESEND_API_KEY,
});

const sendOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return errorResponse(res, "User not found", 404);
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.oTP.create({
      data: { email, otp, expiresAt },
    });

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}`,
    });

    return successResponse(res, null, "OTP sent to your email");
  } catch (error) {
    return errorResponse(res, "Failed to send OTP", 500);
  }
};

console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);

const verifyOTP = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  const otpEntry = await prisma.oTP.findFirst({
    where: { email, otp },
    orderBy: { createdAt: "desc" },
  });

  if (!otpEntry || otpEntry.expiresAt < new Date()) {
    return errorResponse(res, "Invalid or expired OTP", 400);
  }

  return successResponse(res, null, "OTP verified successfully");
};

const resetPassword = async (req: Request, res: Response) => {
  const { email, otp, newPassword } = req.body;

  const otpEntry = await prisma.oTP.findFirst({
    where: { email, otp },
    orderBy: { createdAt: "desc" },
  });

  if (!otpEntry || otpEntry.expiresAt < new Date()) {
    return errorResponse(res, "Invalid or expired OTP", 400);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });

  await prisma.oTP.deleteMany({ where: { email } });

  return successResponse(res, null, "Password reset successful");
};

const getUserProfile = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return errorResponse(res, "Unauthorized", 401);
  }

  const fullUser = await prisma.user.findUnique({
    where: { id: user.userId },
    select: {
      id: true,
      email: true,
      role: true,
      image: true,
      gender: true,
      deletedAt: true,
      createdAt: true,
      userData: true,
      partner: true,
      career: true,
      admin: true,
    },
  });

  return successResponse(res, fullUser, "User profile fetched");
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    const authUser = req.user;

    if (!authUser) {
      return errorResponse(res, "Unauthorized", 401);
    }

    const { phone, gender, name, image } = req.body;

    // Role-specific nested updates
    const userDataUpdate =
      authUser.role === "USER" && (name !== undefined || phone !== undefined)
        ? { name: name ?? undefined }
        : undefined;

    const partnerUpdate =
      authUser.role === "PARTNER" && phone !== undefined
        ? { phone }
        : undefined;

    const adminUpdate =
      authUser.role === "ADMIN" && name !== undefined ? { name } : undefined;

    // Top-level User updates
    const userUpdates: Prisma.UserUpdateInput = {
      ...(gender !== undefined && { gender }),
      ...(image !== undefined && { image }),
      ...(userDataUpdate ? { userData: { update: userDataUpdate } } : {}),
      ...(partnerUpdate ? { partner: { update: partnerUpdate } } : {}),
      ...(adminUpdate ? { admin: { update: adminUpdate } } : {}),
    };

    const updatedUser = await prisma.user.update({
      where: { id: authUser.userId },
      data: userUpdates,
      select: {
        id: true,
        email: true,
        role: true,
        image: true,
        gender: true,
        createdAt: true,
        deletedAt: true,
        userData: true,
        partner: true,
        admin: true,
      },
    });

    return successResponse(res, updatedUser, "Profile updated successfully");
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Profile update failed", 500);
  }
};

module.exports = {
  register,
  login,
  sendOTP,
  verifyOTP,
  resetPassword,
  getUserProfile,
  updateProfile,
};
