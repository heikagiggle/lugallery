export interface ArtisanProfile {
  id: string;
  name: string;
  title: string;
  description: string;
  state: string;
  localGov: string;
  phone: string;
  rating: number;
  images: string[];
  wantToTrain: "yes" | "no"; // 👈 Added this field
  socials: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    whatsapp?: string;
  };
  date: string;
}

export const artisanProfiles: ArtisanProfile[] = [
  {
    id: "1",
    name: "Tolu Crafts",
    title: "Furniture Designer",
    description:
      "Specializes in handcrafted wooden furniture and rustic home décor, combining modern minimalism with African artistry.",
    state: "Abuja",
    localGov: "Gwagwalada",
    phone: "+234 800 123 4567",
    rating: 4,
    wantToTrain: "yes",
    images: ["/carpenter.jpg", "/carpenter.jpg", "/carpenter.jpg", "/carpenter.jpg"],
    socials: {
      instagram: "https://instagram.com/tolucrafts",
      facebook: "https://facebook.com/tolucrafts",
      tiktok: "https://tiktok.com/@tolucrafts",
      whatsapp: "https://wa.me/2348001234567",
    },
    date: "2025-05-27T08:15:00",
  },
  {
    id: "2",
    name: "Ngozi Styles",
    title: "Fashion Designer",
    description:
      "Creates bespoke African and urban fashion pieces for men and women. Known for vibrant prints and bold tailoring.",
    state: "Lagos",
    localGov: "Surulere",
    phone: "+234 801 555 4422",
    rating: 5,
    wantToTrain: "yes",
    images: ["/tailor.jpg", "/tailor.jpg", "/tailor.jpg"],
    socials: {
      instagram: "https://instagram.com/ngozistyles",
      facebook: "https://facebook.com/ngozistyles",
      whatsapp: "https://wa.me/2348015554422",
    },
    date: "2025-05-27T08:15:00",
  },
  {
    id: "3",
    name: "Amaka Lens",
    title: "Photographer",
    description:
      "Professional event and portrait photographer capturing timeless emotions through creative visuals.",
    state: "Enugu",
    localGov: "Nsukka",
    phone: "+234 802 987 6543",
    rating: 4,
    wantToTrain: "no",
    images: ["", "", "", ""],
    socials: {
      instagram: "https://instagram.com/amakalens",
      tiktok: "https://tiktok.com/@amakalens",
      whatsapp: "https://wa.me/2348029876543",
    },
    date: "2025-05-27T08:15:00",
  },
  {
    id: "4",
    name: "Kola Tech",
    title: "Auto Mechanic",
    description:
      "Expert auto technician with 12+ years of experience servicing and upgrading local and foreign vehicles.",
    state: "Oyo",
    localGov: "Ibadan North",
    phone: "+234 805 776 1122",
    rating: 5,
    wantToTrain: "yes",
    images: ["/mechanic.jpg", "/mechanic.jpg", "/mechanic.jpg"],
    socials: {
      facebook: "https://facebook.com/kolatech",
      whatsapp: "https://wa.me/2348057761122",
    },
    date: "2025-05-27T08:15:00",
  },
  {
    id: "5",
    name: "Zainab Beauty Studio",
    title: "Makeup Artist",
    description:
      "Certified makeup artist offering bridal, editorial, and casual glam looks with a flawless finish.",
    state: "Kano",
    localGov: "Nassarawa",
    phone: "+234 809 334 2255",
    rating: 5,
    wantToTrain: "no",
    images: ["/mua.jpg", "/mua.jpg", "/mua.jpg", "/mua.jpg"],
    socials: {
      instagram: "https://instagram.com/zainabbeauty",
      tiktok: "https://tiktok.com/@zainabbeauty",
      whatsapp: "https://wa.me/2348093342255",
    },
    date: "2025-05-27T08:15:00",
  },
];
