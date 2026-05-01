export interface Apprentice {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  image: string;
  state: string;

  skill: string;
  level: "beginner" | "intermediate" | "expert";
  availability: "low" | "medium" | "high";
  daysApplied: string;
  startDate: string;
  duration: string;
  reason: string;
  goal: string;
  age: string;
  language: string;
availableDays: string[]; // ["Monday", "Tuesday", ...]
  availableHours: {
    start: string; // "09:00"
    end: string;   // "17:00"
  };
}

// ✅ Convert to array
export const apprentices: Apprentice[] = [
  {
    id: "1",
    first_name: "Chiamaka",
    last_name: "Okafor",
    email: "chiamaka.okafor@gmail.com",
    phone: "08123456789",
    address: "23 Freedom Estate, Enugu, Nigeria",
    gender: "female",
    state: "lagos",
    image: "/lawyer.jpeg",

    skill: "Tailoring",
    level: "beginner",
    availability: "high",
    daysApplied: "1 day ago",
    startDate: "2026-05-10",
    duration: "6 months",
    language: "English, Igbo, Korean",
    age: "26 - 30",

    reason:
      "I have always been drawn to how fabric can be transformed into something beautiful. Growing up, I watched my aunt tailor wedding outfits for our community, and I knew this was a skill I wanted to master. I want to turn this passion into a livelihood.",
    goal: "To open a small tailoring business in Enugu within 18 months...",
     availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    availableHours: {
      start: "09:00",
      end: "17:00",
    },
  },

  {
    id: "2",
    first_name: "Emeka",
    last_name: "Uche",
    email: "emeka@gmail.com",
    phone: "08098765432",
    address: "Abuja, Nigeria",
    gender: "male",
    state: "abuja",
    image: "/lawyer.jpeg",

    skill: "Photography",
    level: "intermediate",
    availability: "medium",
    daysApplied: "2 days ago",
    startDate: "2026-06-01",
    duration: "3 months",

    reason: "I love capturing moments...",
    goal: "Start a photography brand",
    language: "English, Hausa, Yoruba",
    age: "16 - 19",
    availableDays: ["Monday", "Wednesday", "Friday"],
    availableHours: {
      start: "10:00",
      end: "15:00",
    },
  },
];

export interface ArtisanConnection {
  id: string;
  artisanName: string;
  review: string;
  rating: number;
  skill: string;
}

export const connectedArtisans: ArtisanConnection[] = [
  {
    id: "AR-001",
    artisanName: "John Ade",
    review: "A great mentor who was patient and made learning fun.",
    rating: 5,
    skill: "tailoring",
  },
  {
    id: "AR-002",
    artisanName: "Ngozi O.",
    review: "Good experience overall, though communication could be better.",
    rating: 4,
    skill: "photography",
  },
];
