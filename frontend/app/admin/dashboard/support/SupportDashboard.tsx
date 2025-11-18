"use client";

import { useState } from "react";
import { Chat, dummyChats } from "./data";

const SupportDashboard = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [input, setInput] = useState("");

 const handleSend = () => {
    if (!input.trim() || !selectedChat) return;

    const updated: Chat = {
      ...selectedChat,
      messages: [...selectedChat.messages, { from: "support", text: input }],
    };

    setSelectedChat(updated);
    setInput("");
  };

  const isMobileChatOpen = selectedChat !== null;

  return (
    <div className="flex h-[90vh] bg-white shadow rounded overflow-hidden border border-gray-200 mt-4">

      {/* LEFT SIDE — CHAT LIST */}
      <div
        className={`
          bg-white border-r overflow-y-auto
          w-full md:w-1/3 
          ${isMobileChatOpen ? "hidden md:block" : "block"}
        `}
      >
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">User Chats</h2>
        </div>

        {dummyChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            className={`p-4 cursor-pointer border-b hover:bg-gray-100 ${
              selectedChat?.id === chat.id ? "bg-gray-100" : ""
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
            <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE — CHAT WINDOW */}
      <div
        className={`
          flex flex-col 
          w-full md:w-2/3 
          ${isMobileChatOpen ? "block" : "hidden md:flex"}
        `}
      >
        {/* Header */}
        <div className="p-4 border-b bg-white flex items-center gap-3">
          {/* Back button only on mobile */}
          <button
            onClick={() => setSelectedChat(null)}
            className="md:hidden px-3 py-1 bg-gray-200 rounded"
          >
            Back
          </button>

          {selectedChat ? (
            <div>
              <h2 className="text-lg font-semibold">{selectedChat.name}</h2>
              <p className="text-sm text-gray-500">Chat with user</p>
            </div>
          ) : (
            <p className="text-gray-500">Select a chat</p>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
          {selectedChat?.messages?.map((msg, i) => (
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
        {selectedChat && (
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
        )}
      </div>
    </div>
  );
};

export default SupportDashboard;
