"use client";

import { useState } from "react";

const dummyChats = [
  {
    id: "user123",
    name: "James Doe",
    lastMessage: "I need help with my order.",
    unread: true,
    messages: [
      { from: "user", text: "I need help with my order." },
      { from: "support", text: "Sure, what seems to be the issue?" },
    ],
  },
  {
    id: "user456",
    name: "Sarah Smith",
    lastMessage: "Thanks!",
    unread: false,
    messages: [{ from: "user", text: "Thanks!" }],
  },
];

const SupportDashboard = () => {
  const [selectedChat, setSelectedChat] = useState(dummyChats[0]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const updated = {
      ...selectedChat,
      messages: [...selectedChat.messages, { from: "support", text: input }],
    };
    setSelectedChat(updated);
    setInput("");
    // TODO: Save to DB
  };

  return (
      <div className="flex h-[90vh] bg-white shadow rounded overflow-hidden border border-gray-200 mt-4">
        {/* Left: Chat List */}
        <div className="w-1/3 border-r overflow-y-auto bg-white">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">User Chats</h2>
          </div>
          {dummyChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 cursor-pointer border-b hover:bg-gray-100 ${
                selectedChat.id === chat.id ? "bg-gray-100" : ""
              }`}
            >
              <div className="flex justify-between">
                <h3 className="font-medium">{chat.name}</h3>
                {chat.unread && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                    New
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 truncate">
                {chat.lastMessage}
              </p>
            </div>
          ))}
        </div>

        {/* Right: Chat Window */}
        <div className="w-2/3 flex flex-col">
          <div className="p-4 border-b bg-white">
            <h2 className="text-lg font-semibold">{selectedChat.name}</h2>
            <p className="text-sm text-gray-500">Chat with user</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
            {selectedChat.messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.from === "support" ? "justify-end" : "justify-start"
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

          {/* Input */}
          <div className="p-4 border-t bg-white flex">
            <input
              className="flex-1 px-4 py-2 border rounded mr-2 text-sm"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-[#006400] text-white rounded hover:bg-green-700"
            >
              Send
            </button>
          </div>
        </div>
      </div>
  );
};

export default SupportDashboard;
