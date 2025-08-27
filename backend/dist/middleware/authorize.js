"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const jwt = require("jsonwebtoken");
const authorize = (allowedRoles) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Missing or invalid token" });
        }
        const token = authHeader.split(" ")[1];
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            if (!allowedRoles.includes(payload.role)) {
                return res.status(403).json({ message: "Access denied" });
            }
            req.user = payload;
            next();
        }
        catch (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
    };
};
exports.authorize = authorize;
