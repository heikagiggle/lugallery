import { Headphones, SendHorizonal } from "lucide-react";
import { useState } from "react";

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

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-black to-[#006400] text-white p-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Need Help?</h1>
          <p className="text-sm">Chat with us or call directly</p>
        </div>
        <a href="tel:+2349020307231" className="flex items-center gap-1 hover:underline">
          <Headphones className="w-5 h-5" />
          <span className="text-sm hidden sm:inline">+234 902 030 7231</span>
        </a>
      </div>

      {/* Chat Body */}
      <div className="p-4 h-64 overflow-y-auto bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 flex ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded-lg px-3 py-2 text-sm max-w-xs ${
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
      <div className="flex border-t border-gray-300">
        <input
          type="text"
          className="flex-1 px-4 py-2 text-sm outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="p-2 bg-gradient-to-r from-black to-[#006400] text-white hover:bg-blue-700"
          onClick={sendMessage}
        >
          <SendHorizonal className="w-4 h-4" />
        </button>
      </div>

      {/* Footer note */}
      <div className="text-xs text-gray-500 p-2 text-center bg-gray-100">
        Available: Mon–Fri (8am–6pm), Weekends (8am–5pm), Public Holidays (9am–5pm)
      </div>
    </div>
  );
};

export default ChatBox;
