import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";
import { errorResponse, successResponse } from "../../../utils/apiResponse";

/**
 * GET /api/admin/support/tickets
 */
export const getAllTickets = async (req: Request, res: Response) => {
  if (req.user?.role !== "ADMIN") {
    return errorResponse(res, "Forbidden", 403);
  }

  const tickets = await prisma.supportTicket.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { email: true },
      },
      messages: {
        take: 1,
        orderBy: { createdAt: "desc" },
      },
    },
  });

  return successResponse(res, tickets, "All tickets fetched");
};

/**
 * GET /api/admin/support/tickets/:id
 */
export const getTicketByIdAdmin = async (req: Request, res: Response) => {
  if (req.user?.role !== "ADMIN") {
    return errorResponse(res, "Forbidden", 403);
  }

  const ticket = await prisma.supportTicket.findUnique({
    where: { id: req.params.id },
    include: {
      user: {
        select: { email: true },
      },
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!ticket) {
    return errorResponse(res, "Ticket not found", 404);
  }

  return successResponse(res, ticket, "Ticket fetched");
};

/**
 * POST /api/admin/support/messages
 */
export const adminReply = async (req: Request, res: Response) => {
  if (req.user?.role !== "ADMIN") {
    return errorResponse(res, "Forbidden", 403);
  }

  const { ticketId, message } = req.body;

  const newMessage = await prisma.supportMessage.create({
    data: {
      ticketId,
      message,
      sender: "ADMIN",
    },
  });

  await prisma.supportTicket.update({
    where: { id: ticketId },
    data: { status: "IN_PROGRESS" },
  });

  return successResponse(res, newMessage, "Reply sent");
};

/**
 * PATCH /api/admin/support/tickets/:id/close
 */
// export const closeTicket = async (req: Request, res: Response) => {
//   if (req.user?.role !== "ADMIN") {
//     return errorResponse(res, "Forbidden", 403);
//   }

//   await prisma.supportTicket.update({
//     where: { id: req.params.id },
//     data: { status: "RESOLVED" },
//   });

//   return successResponse(res, null, "Ticket closed");
// };

export const closeTicket = async (req: Request, res: Response) => {
  if (req.user?.role !== "ADMIN") {
    return errorResponse(res, "Forbidden", 403);
  }

  const ticketId = req.params.id;

  const ticket = await prisma.supportTicket.findUnique({
    where: { id: ticketId },
  });

  if (!ticket) {
    return errorResponse(res, "Ticket not found", 404);
  }

  if (ticket.status === "RESOLVED") {
    return errorResponse(res, "Ticket already resolved", 400);
  }

  await prisma.supportTicket.update({
    where: { id: ticketId },
    data: { status: "RESOLVED" },
  });

  return successResponse(res, null, "Ticket marked as resolved");
};
