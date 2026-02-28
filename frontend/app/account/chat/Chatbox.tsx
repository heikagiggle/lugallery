"use client";

import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Headphones, SendHorizonal } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SupportMessageData, SupportMessageSchema } from "./schema";
import { useSupportChat } from "@/app/hooks/user/chat";
// import { useSupportChat, SupportMessage } from "@/app/hooks/support/useSupportChat";

type LocalMessage = {
  id?: string;
  from: "user" | "support";
  text: string;
};

const ChatBox = () => {
  const { createTicket, sendMessage, getTicketById } = useSupportChat();

  const [messages, setMessages] = useState<LocalMessage[]>([
    { from: "support", text: "Hi there! How can we assist you today?" },
  ]);

  const chatBodyRef = useRef<HTMLDivElement | null>(null);

  const [ticketId, setTicketId] = useState<string | null>(null);

  const form = useForm<SupportMessageData>({
    resolver: zodResolver(SupportMessageSchema),
    defaultValues: { message: "" },
  });

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);
  // 🚀 Poll for admin replies every 5 seconds
  useEffect(() => {
    if (!ticketId) return;

    const fetchLatestMessages = async () => {
      console.log("Polling for messages", Date.now());
      const serverMessages = await getTicketById(ticketId);
      if (!serverMessages) return;

      setMessages((prev) => {
        // 1. Map server messages to our local format
        const incoming = serverMessages.map((msg) => ({
          id: msg.id,
          from:
            msg.sender === "USER" ? ("user" as const) : ("support" as const),
          text: msg.message,
        }));

        // 2. Filter out messages we already have
        const newMessages = incoming.filter((srvMsg) => {
          // Check by ID
          const existsById = prev.some((p) => p.id === srvMsg.id);
          if (existsById) return false;

          // Check by Content (to catch optimistic updates that haven't gotten an ID yet)
          const existsByContent = prev.some(
            (p) =>
              p.from === srvMsg.from &&
              p.text === srvMsg.text &&
              p.id?.startsWith("temp-"),
          );
          if (existsByContent) {
            // Logic: We found a match! We should ideally replace the temp one with the srv one.
            // But for simplicity in this filter, we just skip adding it as a "new" message
            // because we'll handle the "swap" or "cleanup" by simply letting the
            // server version take over later or keeping the temp one until next render.
            return false;
          }

          return true;
        });

        if (newMessages.length === 0) return prev;

        // 3. Clean up: Remove any temporary messages that have now been matched by the server
        const filteredPrev = prev.filter((p) => {
          const isTempMatchedByIncoming =
            p.id?.startsWith("temp-") &&
            incoming.some((i) => i.text === p.text && i.from === p.from);
          return !isTempMatchedByIncoming;
        });

        return [...filteredPrev, ...newMessages];
      });
    };

    fetchLatestMessages();
    const interval = setInterval(fetchLatestMessages, 5000);
    return () => clearInterval(interval);
  }, [ticketId]);

  // --- Submit Logic ---
  const onSubmit = async (data: SupportMessageData) => {
    const messageText = data.message;
    if (!messageText.trim()) return;

    form.reset();

    if (!ticketId) {
      // First message - let the poll handle the UI update
      const newId = await createTicket(messageText);
      if (newId) setTicketId(newId);
    } else {
      // Follow-up: Add optimistic message with a 'temp-' prefix
      const tempId = `temp-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        { id: tempId, from: "user", text: messageText },
      ]);

      await sendMessage(ticketId, messageText);
    }
  };

  return (
    <div className="max-w-md mx-auto shadow-lg rounded-lg overflow-hidden border border-border bg-card">
      {/* Header */}
      <div className="bg-gradient-to-r from-black to-[#006400] text-white p-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Need Help?</h1>
          <p className="text-sm">Chat with us or call directly</p>
        </div>

        <a
          href="tel:+2349020307231"
          className="flex items-center gap-1 hover:underline"
        >
          <Headphones className="w-5 h-5" />
          <span className="text-sm hidden sm:inline">+234 902 030 7231</span>
        </a>
      </div>

      {/* Chat Body */}
      <div
        ref={chatBodyRef}
        className="p-4 h-64 overflow-y-auto bg-muted dark:bg-secondary"
      >
        {messages.map((msg, idx) => (
          <div
            key={msg.id ?? idx}
            className={`mb-2 flex ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded-lg px-3 py-2 text-sm max-w-xs break-words ${
                msg.from === "user"
                  ? "bg-gradient-to-r from-black to-[#006400] text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center border-t border-border bg-card"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex-1">
                <input
                  {...field}
                  type="text"
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 text-sm bg-transparent outline-none"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            className="p-3 bg-gradient-to-r from-foreground to-brand text-primary-foreground hover:opacity-90 transition"
          >
            <SendHorizonal className="w-4 h-4" />
          </button>
        </form>
      </Form>

      <div className="text-xs text-muted-foreground p-2 text-center bg-muted">
        Available: Mon–Fri (8am–6pm), Weekends (8am–5pm), Public Holidays
        (9am–5pm)
      </div>
    </div>
  );
};

export default ChatBox;
