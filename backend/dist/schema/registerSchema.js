"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSchema = exports.CareerSchema = exports.PartnerSchema = exports.UserRegisterSchema = void 0;
const zod_1 = require("zod");
// USER schema
exports.UserRegisterSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Your name is required" }),
    phone: zod_1.z.string().min(1, { message: "Phone number is required" }),
    email: zod_1.z.string().email({ message: "Valid email is required" }),
    password: zod_1.z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
    role: zod_1.z.literal("USER"),
});
// PARTNER schema
exports.PartnerSchema = zod_1.z.object({
    first_name: zod_1.z.string().min(1, { message: "First name is required" }),
    last_name: zod_1.z.string().min(1, { message: "Last name is required" }),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string().min(10, { message: "Phone number is required" }),
    portfolio: zod_1.z.string().min(1, { message: "Portfolio link is required" }),
    artisan: zod_1.z.string(),
    password: zod_1.z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
    role: zod_1.z.literal("PARTNER"),
});
//Career schema
exports.CareerSchema = zod_1.z.object({
    first_name: zod_1.z.string().min(1, { message: "First name is required" }),
    last_name: zod_1.z.string().min(1, { message: "Last name is required" }),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string().min(10, { message: "Phone number is required" }),
    gender: zod_1.z.enum(["male", "female"], {
        message: "Gender is required",
    }),
    password: zod_1.z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
    role: zod_1.z.literal("CAREER"),
});
// ADMIN schema
exports.AdminSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Name is required" }),
    email: zod_1.z.string().email(),
    password: zod_1.z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
    role: zod_1.z.literal("ADMIN"),
});
