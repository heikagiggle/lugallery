// Menu navigation items
export const menu = [
  {
    id: "1",
    title: "Discover",
    path: "/user/discover",
  },
  {
    id: "2",
    title: "Join as Artisan",
    path: "/user/partner",
  },
  {
    id: "3",
    title: "Become an Artisan",
    path: "/user/become-artisan",
  },
  {
    id: "4",
    title: "About",
    path: "/user/about-lugallery",
  },
  {
    id: "5",
    title: "Login",
    path: "/login",
  },
];

// Artisan type
export type Artisan = {
  id: string;
  image: string;
  title: string;
  desc: string;
};

// Featured artisans
export const featured: Artisan[] = [
  {
    id: "1",
    image: "/fashion.jpg",
    title: "Fashion Designer",
    desc: "Our fashion designers don’t just sew – they slay.",
  },
  {
    id: "2",
    image: "/carpenter.jpg",
    title: "Carpenter",
    desc: "Wood you believe it? Specializing in building and repairing wooden furniture, doors, cabinets, and home structures.",
  },
  {
    id: "3",
    image: "/welder.jpg",
    title: "Welder",
    desc: "Metalwork but make it aesthetic. Joins and repairs metal components for construction, gates, railings, and industrial use.",
  },
  {
    id: "4",
    image: "/artist.jpg",
    title: "Artist",
    desc: "Need your walls to vibe? Your walls called — they’re bored.",
  },
];

export const funDescriptions: Record<string, string> = {
  "1": `Drip check: passed ✅. Our fashion designers don’t just sew – they slay. Whether you're dressing for a lit party or your dream wedding, they’ll get you red-carpet ready 🔥👗.\n\nThey create custom clothing and stylish outfits tailored to your body, occasion, and taste.`,

  "2": `Wood you believe it? 🪵 Our carpenters can turn plain planks into Pinterest-worthy masterpieces. From boho beds to sleek shelves, they’re serving sawdust and style.\n\nThey specialize in building and repairing wooden furniture, doors, cabinets, and home structures.`,

  "3": `Metalwork but make it ✨aesthetic✨. This welder's serving sparks and structure. Think industrial chic meets Mad Max. They spark joy AND metal. 🔥\n\nOur welders are low-key superheroes fusing stuff like it’s magic. Gates, grills, or dope metal art? Say less. They got you.`,

  "4": `Need your walls to vibe? Your walls called — they’re bored. 🎨 Our artists are painting dreams and turning bland spaces into jaw-dropping aesthetics. Your Insta background just leveled up 💥.\n\nOur artist serves up vibes, murals, and custom pieces that’ll have your guests saying ‘whoa, who did that?’`,
};
