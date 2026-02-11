import express from "express";
const auth = require("../../middleware/auth");

import {
  getAllTickets,
  getTicketByIdAdmin,
  adminReply,
  closeTicket,
} from "../../controllers/admin/support/adminSupportController";

const router = express.Router();

router.get("/tickets", auth, getAllTickets);
router.get("/tickets/:id", auth, getTicketByIdAdmin);
router.post("/messages", auth, adminReply);
router.patch("/tickets/:id/close", auth, closeTicket);

export default router;
