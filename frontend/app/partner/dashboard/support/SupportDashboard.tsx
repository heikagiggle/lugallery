"use client";

import { useAdminSupportChat } from "@/app/hooks/admin/support";
import { useEffect, useState } from "react";

type Message = {
  id?: string;
  from: "support" | "user";
  text: string;
};

type SelectedChat = {
  id: string;
  name: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
  messages: Message[];
};

const SupportDashboard = () => {
  const {
    getAllTickets,
    getTicketById,
    sendMessage,
    closeTicket,
  } = useAdminSupportChat();

  const [tickets, setTickets] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] =
    useState<SelectedChat | null>(null);
  const [input, setInput] = useState("");

  // ---------------------------
  // Fetch all tickets on mount
  // ---------------------------
  useEffect(() => {
    const fetchTickets = async () => {
      const data = await getAllTickets();
      setTickets(data || []);
    };

    fetchTickets();
  }, []);

  // ---------------------------
  // Poll selected ticket
  // ---------------------------
  useEffect(() => {
    if (!selectedChat) return;

    const interval = setInterval(async () => {
      const updated = await getTicketById(selectedChat.id);
      if (!updated) return;

      setSelectedChat({
        id: updated.id,
        name: updated.user.email,
        status: updated.status,
        messages: updated.messages.map((msg: any) => ({
          id: msg.id,
          from: msg.sender === "ADMIN" ? "support" : "user",
          text: msg.message,
        })),
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedChat?.id]);

  // ---------------------------
  // Send reply
  // ---------------------------
  const handleSend = async () => {
    if (!input.trim() || !selectedChat) return;
    if (selectedChat.status === "RESOLVED") return;

    await sendMessage(selectedChat.id, input);

    setSelectedChat((prev: any) => ({
      ...prev,
      status: "IN_PROGRESS",
      messages: [
        ...prev.messages,
        { from: "support", text: input },
      ],
    }));

    setInput("");
  };

  const isMobileChatOpen = selectedChat !== null;

  return (
    <div className="flex h-[90vh] bg-background shadow rounded overflow-hidden border mt-4">
      {/* ========================= */}
      {/* LEFT SIDE — TICKET LIST */}
      {/* ========================= */}
      <div
        className={`
          border-r overflow-y-auto
          w-full md:w-1/3
          ${isMobileChatOpen ? "hidden md:block" : "block"}
        `}
      >
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Support Tickets</h2>
        </div>

        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            onClick={async () => {
              const fullTicket = await getTicketById(ticket.id);
              if (!fullTicket) return;

              setSelectedChat({
                id: fullTicket.id,
                name: fullTicket.user.email,
                status: fullTicket.status,
                messages: fullTicket.messages.map((msg: any) => ({
                  id: msg.id,
                  from:
                    msg.sender === "ADMIN"
                      ? "support"
                      : "user",
                  text: msg.message,
                })),
              });
            }}
            className="p-4 cursor-pointer border-b hover:bg-muted"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">
                {ticket.user.email}
              </h3>

              <span
                className={`text-xs px-2 py-1 rounded ${
                  ticket.status === "OPEN"
                    ? "bg-yellow-100 text-yellow-800"
                    : ticket.status === "IN_PROGRESS"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {ticket.status}
              </span>
            </div>

            <p className="text-sm text-muted-foreground truncate">
              {ticket.messages[0]?.message || "No messages yet"}
            </p>
          </div>
        ))}
      </div>

      {/* ========================= */}
      {/* RIGHT SIDE — CHAT WINDOW */}
      {/* ========================= */}
      <div
        className={`
          flex flex-col
          w-full md:w-2/3
          ${isMobileChatOpen ? "block" : "hidden md:flex"}
        `}
      >
        {/* -------- Header -------- */}
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedChat(null)}
              className="md:hidden px-3 py-1 bg-muted rounded"
            >
              Back
            </button>

            {selectedChat ? (
              <div>
                <h2 className="text-lg font-semibold">
                  {selectedChat.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Status: {selectedChat.status}
                </p>
              </div>
            ) : (
              <p>Select a ticket</p>
            )}
          </div>

          {/* Close Ticket Button */}
          {selectedChat && (
            <button
              disabled={selectedChat.status === "RESOLVED"}
              onClick={async () => {
                const success = await closeTicket(
                  selectedChat.id
                );
                if (!success) return;

                setSelectedChat((prev: any) => ({
                  ...prev,
                  status: "RESOLVED",
                }));
              }}
              className={`px-4 py-2 text-sm rounded ${
                selectedChat.status === "RESOLVED"
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              {selectedChat.status === "RESOLVED"
                ? "Ticket Closed"
                : "Close Ticket"}
            </button>
          )}
        </div>

        {/* -------- Messages -------- */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-muted">
          {selectedChat?.messages.map((msg, i) => (
            <div
              key={msg.id ?? i}
              className={`flex ${
                msg.from === "support"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`px-3 py-2 rounded-lg text-sm max-w-xs ${
                  msg.from === "support"
                    ? "bg-[#006400] text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* -------- Input -------- */}
        {selectedChat && (
          <div className="p-4 border-t flex bg-background">
            <input
              disabled={selectedChat.status === "RESOLVED"}
              className="flex-1 px-4 py-2 border rounded mr-2 text-sm disabled:bg-gray-100"
              placeholder={
                selectedChat.status === "RESOLVED"
                  ? "Ticket is closed"
                  : "Type your reply..."
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleSend()
              }
            />
            <button
              disabled={selectedChat.status === "RESOLVED"}
              onClick={handleSend}
              className="px-4 py-2 bg-[#006400] text-white rounded hover:bg-green-700 disabled:bg-gray-400"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportDashboard;