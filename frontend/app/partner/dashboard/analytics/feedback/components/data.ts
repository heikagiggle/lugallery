export interface FeedbackProps {
  id: string;
  user: string;
  rating: number;
  recommend: boolean;
  suggestions: string;
  submittedAt: string;
}

export const feedbacks: FeedbackProps[] = [
  {
    id: "1",
    user: "Jane Doe",
    rating: 5,
    recommend: true,
    suggestions: "Everything is great, just keep improving speed!",
    submittedAt: "2025-11-04T10:00:00",
  },
  {
    id: "2",
    user: "John Smith",
    rating: 3,
    recommend: false,
    suggestions: "Some features are confusing",
    submittedAt: "2025-11-03T09:30:00",
  },
];
