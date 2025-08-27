// Import types only (TypeScript syntax)
import type { Request, Response } from "express";

// Import runtime modules with require
const { prisma } = require("../../lib/prisma");
const {
  AdminSchema,
  CareerSchema,
  PartnerSchema,
  UserRegisterSchema,
} = require("../../schema/registerSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

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
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
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
                  gender: extra.gender,
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

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  res.json({ message: "Login successful", token, role: user.role });
};

const sendOTP = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ message: "User not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await prisma.oTP.create({
    data: {
      email,
      otp,
      expiresAt,
    },
  });

  // Send email via nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`,
  };

  await transporter.sendMail(mailOptions);

  res.json({ message: "OTP sent to your email." });
};

const verifyOTP = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  const otpEntry = await prisma.oTP.findFirst({
    where: { email, otp },
    orderBy: { createdAt: "desc" },
  });

  if (!otpEntry || otpEntry.expiresAt < new Date()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  res.json({ message: "OTP verified successfully" });
};

const resetPassword = async (req: Request, res: Response) => {
  const { email, otp, newPassword } = req.body;

  const otpEntry = await prisma.oTP.findFirst({
    where: { email, otp },
    orderBy: { createdAt: "desc" },
  });

  if (!otpEntry || otpEntry.expiresAt < new Date()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });

  // Optionally delete used OTPs
  await prisma.oTP.deleteMany({
    where: { email },
  });

  res.json({ message: "Password reset successful" });
};

const getUserProfile = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (user.role === "ADMIN") {
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
      },
    });
    return res.json(allUsers);
  }

  // Regular user — show only their own profile
  const currentUser = await prisma.user.findUnique({
    where: { id: user.userId },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });

  res.json(currentUser);
};

module.exports = {
  register,
  login,
  sendOTP,
  verifyOTP,
  resetPassword,
  getUserProfile,
};
