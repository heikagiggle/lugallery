import express from "express";
const auth = require("../middleware/auth");
import {
  createTicket,
  getMyTickets,
  getTicketById,
  sendMessage,
} from "../controllers/account/supportController";

const router = express.Router();

router.post("/tickets", auth, createTicket);
router.get("/tickets/me", auth, getMyTickets);
router.get("/tickets/:id", auth, getTicketById);
router.post("/messages", auth, sendMessage);

export default router;
