
import express from "express";
import { authorize } from "../middleware/authorize"; 

const router = express.Router();

router.get(
  "/partner/dashboard",
  authorize(["PARTNER"]),
  (_req, res) => {
    res.json({ message: "Welcome to the Partner dashboard!" });
  }
);

router.get(
  "/apprentice/dashboard",
  authorize(["APPRENTICE"]),
  (_req, res) => {
    res.json({ message: "Welcome to the Apprentice dashboard!" });
  }
);

export default router;

