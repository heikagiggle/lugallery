import type { Router } from "express";
import express = require("express");

// Require controllers (CommonJS)
const {
  register,
  login,
  sendOTP,
  verifyOTP,
  resetPassword,
  getUserProfile,
  updateProfile,
} = require("../controllers/auth/authControllers");

// Require middleware
const auth = require("../middleware/auth");

const router: Router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.get("/me", auth, getUserProfile);
router.patch("/update-profile", auth, updateProfile);

module.exports = router;
