export interface ArtisanProps {
  id: string;
  name: string;
  email: string;
  state: string;
  address: string;
  image: string;
  date_registered: string;
  skill: string;
  //   doYouTrain: string;
  //   willingToTrain: string;
  //   artisan: string;
  //   protfolio: string;
}

export const artisans: ArtisanProps[] = [
  {
    id: "1",
    name: "Chika Okafor",
    email: "chika.okafor@gmail.com",
    state: "Lagos",
    address: "12 Admiralty Way, Lekki Phase 1",
    date_registered: "2025-09-01T10:00:00",
    image: "/maxky.jpeg",
    skill: "Furniture Designer",
  },
  {
    id: "2",
    name: "Abdul Musa",
    email: "abdul.musa@yahoo.com",
    state: "Kano",
    address: "23 Ahmadu Bello Way, Nassarawa GRA",
    date_registered: "2025-08-21T09:30:00",
    image: "/maxky.jpeg",
    skill: "Fashion Designer",
  },
  {
    id: "3",
    name: "Ngozi Eze",
    email: "ngozi.eze@gmail.com",
    state: "Enugu",
    address: "5 Zik Avenue, Independence Layout",
    date_registered: "2025-07-15T14:45:00",
    image: "/maxky.jpeg",
    skill: "Photographer",
  },
  {
    id: "4",
    name: "Tunde Ajayi",
    email: "tunde.ajayi@hotmail.com",
    state: "Oyo",
    address: "89 Ring Road, Ibadan",
    date_registered: "2025-06-12T11:20:00",
    image: "/maxky.jpeg",
    skill: "Auto Mechanic",
  },
  {
    id: "5",
    name: "Aisha Bello",
    email: "aisha.bello@outlook.com",
    state: "Kaduna",
    address: "44 Yakubu Gowon Way",
    date_registered: "2025-05-27T08:15:00",
    image: "/maxky.jpeg",
    skill: "Makeup Artist",
  },
  {
    id: "6",
    name: "John Okon",
    email: "john.okon@gmail.com",
    state: "Akwa Ibom",
    address: "77 Oron Road, Uyo",
    date_registered: "2025-04-30T16:00:00",
    image: "/maxky.jpeg",
    skill: "Makeup Artist",
  },
];
