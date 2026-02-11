import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Headphones, SendHorizonal } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SupportMessageData, SupportMessageSchema } from "./schema";

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { from: "support", text: "Hi there! How can we assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");
  };

  const form = useForm<SupportMessageData>({
    resolver: zodResolver(SupportMessageSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (data: SupportMessageData) => {
    // Later this becomes a POST request
    setMessages((prev) => [...prev, { from: "user", text: data.message }]);

    form.reset();
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
      <div className="p-4 h-64 overflow-y-auto bg-muted dark:bg-secondary">
        {messages.map((msg, idx) => (
          <div
            key={idx}
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

      {/* Footer note */}
      <div className="text-xs text-muted-foreground p-2 text-center bg-muted">
        Available: Mon–Fri (8am–6pm), Weekends (8am–5pm), Public Holidays
        (9am–5pm)
      </div>
    </div>
  );
};

export default ChatBox;
