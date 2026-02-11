import type { Request, Response, NextFunction } from "express";
import { JwtPayload } from "../types/JwtPayload";
const jwt = require("jsonwebtoken");
import { prisma } from "../lib/prisma";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as JwtPayload;
    // 🔍 CHECK USER IN DATABASE
    const dbUser = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        role: true,
        deletedAt: true,
      },
    });

    if (!dbUser || dbUser.deletedAt) {
      return res.status(401).json({ message: "Account no longer active" });
    }

    // Attach safe user info to request
    req.user = {
      userId: dbUser.id,
      role: dbUser.role,
    };
    // req.user = decoded;

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token. Kindly login" });
  }
};

module.exports = verifyToken;
