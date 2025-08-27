import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "../types/JwtPayload";
const jwt = require("jsonwebtoken");


export const authorize = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      if (!allowedRoles.includes(payload.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      req.user = payload;

      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};
