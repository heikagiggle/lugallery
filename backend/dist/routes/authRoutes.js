"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
// Require controllers (CommonJS)
const { register, login, sendOTP, verifyOTP, resetPassword, getUserProfile, } = require("../controllers/auth/authControllers");
// Require middleware
const auth = require("../middleware/auth");
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.get("/me", auth, getUserProfile);
module.exports = router;
