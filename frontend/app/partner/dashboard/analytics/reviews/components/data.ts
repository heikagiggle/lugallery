export interface ReviewsProps {
  id: string;
  user: string;
  artisan: string;
  rating: string; // e.g. "⭐⭐⭐⭐"
  review: string;
  status: "pending" | "approved" | "rejected";
}

export const reviews: ReviewsProps[] = [
  {
    id: "1",
    user: "Chika Okafor",
    artisan: "John Doe",
    rating: "⭐⭐⭐⭐",
    review: "Excellent craftsmanship! The furniture came out beautifully.",
    status: "pending",
  },
  {
    id: "2",
    user: "Abdul Musa",
    artisan: "Aisha Bello",
    rating: "⭐⭐⭐",
    review: "Good work but delivery was a bit late.",
    status: "approved",
  },
  {
    id: "3",
    user: "Ngozi Eze",
    artisan: "Tunde Ajayi",
    rating: "⭐⭐⭐⭐⭐",
    review:
      "Amazing service! Highly recommend this artisan.Excellent craftsmanship! The furniture came out beautifully.",
    status: "approved",
  },
  {
    id: "4",
    user: "Tunde Ajayi",
    artisan: "Emeka Umeh",
    rating: "⭐⭐",
    review: "The communication could have been better.",
    status: "rejected",
  },
  {
    id: "5",
    user: "Aisha Bello",
    artisan: "Ngozi Eze",
    rating: "⭐⭐⭐⭐",
    review: "Great attention to detail. Will definitely hire again.",
    status: "pending",
  },
  {
    id: "6",
    user: "John Okon",
    artisan: "Bola Shittu",
    rating: "⭐⭐⭐",
    review: "Job done okay, but not exactly as expected.",
    status: "pending",
  },
  {
    id: "7",
    user: "Bola Shittu",
    artisan: "David Bassey",
    rating: "⭐⭐⭐⭐⭐",
    review: "Very professional and polite, great work overall.",
    status: "approved",
  },
  {
    id: "8",
    user: "Emeka Umeh",
    artisan: "Fatima Abubakar",
    rating: "⭐⭐⭐",
    review: "The end result was fine, though slightly delayed.",
    status: "rejected",
  },
  {
    id: "9",
    user: "Fatima Abubakar",
    artisan: "Ifeanyi Nnaji",
    rating: "⭐⭐⭐⭐⭐",
    review: "Exceptional work! The design exceeded my expectations.",
    status: "approved",
  },
  {
    id: "10",
    user: "David Bassey",
    artisan: "Chika Okafor",
    rating: "⭐⭐⭐",
    review: "Good, but could be more responsive during the process.",
    status: "pending",
  },
  {
    id: "11",
    user: "Ruqayyah Sani",
    artisan: "Abdul Musa",
    rating: "⭐⭐⭐⭐",
    review: "Solid craftsmanship and timely delivery.",
    status: "approved",
  },
  {
    id: "12",
    user: "Ifeanyi Nnaji",
    artisan: "Tolu Crafts",
    rating: "⭐⭐⭐⭐⭐",
    review: "Loved the experience! Highly skilled and courteous.",
    status: "approved",
  },
];
