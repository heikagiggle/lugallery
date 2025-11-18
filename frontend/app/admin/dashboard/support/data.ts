export type ChatMessage = {
  from: "user" | "support";
  text: string;
};

export type Chat = {
  id: string;
  name: string;
  lastMessage: string;
  unread: boolean;
  messages: ChatMessage[];
};

export const dummyChats: Chat[] = [
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
