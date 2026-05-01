import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { errorResponse, successResponse } from "../../utils/apiResponse";
import {
  CreateTicketSchema,
  SendMessageSchema,
} from "../../schema/accountSchema";

/**
 * POST /api/support/tickets
 * Create a new support ticket (complaint)
 */
export const createTicket = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) return errorResponse(res, "Unauthorized", 401);

  const parsed = CreateTicketSchema.safeParse(req.body);
  if (!parsed.success) {
    return errorResponse(res, parsed.error.issues[0].message, 400);
  }

  const ticket = await prisma.supportTicket.create({
    data: {
      userId,
      messages: {
        create: {
          message: parsed.data.message,
          senderRole: "USER",
        },
      },
    },
    include: { messages: true },
  });

  return successResponse(res, ticket, "Support ticket created");
};

/**
 * GET /api/support/tickets/me
 * List all tickets for logged-in user
 */
export const getMyTickets = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) return errorResponse(res, "Unauthorized", 401);

  const tickets = await prisma.supportTicket.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      messages: {
        take: 1,
        orderBy: { createdAt: "desc" },
      },
    },
  });

  return successResponse(res, tickets, "Tickets fetched");
};

/**
 * GET /api/support/tickets/:id
 * Get a single ticket conversation
 */
export const getTicketById = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const ticketId = req.params.id as string; // ✅ cast here

  if (!userId) return errorResponse(res, "Unauthorized", 401);

  const ticket = await prisma.supportTicket.findFirst({
    where: {
      id: ticketId,
      userId,
    },
    include: {
      messages: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!ticket) return errorResponse(res, "Ticket not found", 404);
  return successResponse(res, ticket, "Ticket fetched");
};

/**
 * POST /api/support/messages
 * Send message in an existing ticket
 */
export const sendMessage = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) return errorResponse(res, "Unauthorized", 401);

  const parsed = SendMessageSchema.safeParse(req.body);
  if (!parsed.success) {
    return errorResponse(res, parsed.error.issues[0].message, 400);
  }

  const { ticketId, message } = parsed.data;

  // Ensure ticket belongs to user
  const ticket = await prisma.supportTicket.findFirst({
    where: {
      id: ticketId,
      userId,
    },
  });

  if (!ticket) {
    return errorResponse(res, "Ticket not found", 404);
  }

  const newMessage = await prisma.supportMessage.create({
    data: {
      ticketId,
      message,
      senderId: userId,
      senderRole: "USER",
    },
  });

  return successResponse(res, newMessage, "Message sent");
};
