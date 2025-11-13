export interface StudentProps {
  id: string;
  name: string;
  email: string;
  state: string;
  address: string;
  image: string;
  date_registered: string;
  skill: string;
  review: string;
  rating: number;
  duration_months: number;
  start_date: string;
  end_date: string;
  status: "active" | "completed" | "dropped";
}

export interface ArtisanWithStudentsProps {
  id: string;
  name: string;
  email: string;
  state: string;
  address: string;
  image: string;
  date_registered: string;
  skill: string;
  students: StudentProps[];
}

export const artisansWithStudents: ArtisanWithStudentsProps[] = [
  {
    id: "1",
    name: "Chika Okafor",
    email: "chika.okafor@gmail.com",
    state: "Lagos",
    address: "12 Admiralty Way, Lekki Phase 1",
    date_registered: "2025-09-01T10:00:00",
    image: "/maxky.jpeg",
    skill: "Furniture Designer",
    students: [
      {
        id: "S1",
        name: "Emeka Johnson",
        email: "emeka.johnson@gmail.com",
        state: "Lagos",
        address: "45 Freedom Way, Lekki",
        date_registered: "2025-09-15T10:00:00",
        image: "/student1.jpeg",
        skill: "Furniture Crafting",
        review:
          "Chika is patient and thorough. I learned how to build complex chairs.",
        rating: 5,
        duration_months: 6,
        start_date: "2025-09-10",
        end_date: "2026-03-10",
        status: "active",
      },
      {
        id: "S2",
        name: "Tolu Adedeji",
        email: "tolu.adedeji@yahoo.com",
        state: "Ogun",
        address: "12 Adebayo St, Abeokuta",
        date_registered: "2025-08-05T09:00:00",
        image: "/student2.jpeg",
        skill: "Wood Finishing",
        review: "Great training in sanding and finishing techniques.",
        rating: 4,
        duration_months: 4,
        start_date: "2025-07-01",
        end_date: "2025-11-01",
        status: "completed",
      },
    ],
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
    students: [
      {
        id: "S3",
        name: "Zainab Umar",
        email: "zainab.umar@gmail.com",
        state: "Kano",
        address: "10 Emir Rd, Kano",
        date_registered: "2025-10-01T08:30:00",
        image: "/student3.jpeg",
        skill: "Tailoring",
        review: "Abdul’s attention to detail helped me master Ankara designs.",
        rating: 5,
        duration_months: 3,
        start_date: "2025-10-01",
        end_date: "2026-01-01",
        status: "active",
      },
      {
        id: "S4",
        name: "Fatima Isa",
        email: "fatima.isa@yahoo.com",
        state: "Kano",
        address: "4 Bello Road, Kano",
        date_registered: "2025-09-10T11:00:00",
        image: "/student4.jpeg",
        skill: "Fashion Sketching",
        review: "Loved how Abdul simplified sketching techniques.",
        rating: 4,
        duration_months: 2,
        start_date: "2025-09-05",
        end_date: "2025-11-05",
        status: "completed",
      },
    ],
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
    students: [
      {
        id: "S5",
        name: "Chinedu Obi",
        email: "chinedu.obi@gmail.com",
        state: "Enugu",
        address: "3 Nike Lake Rd, Enugu",
        date_registered: "2025-09-02T12:00:00",
        image: "/student5.jpeg",
        skill: "Portrait Photography",
        review: "Ngozi’s lighting lessons were top-notch!",
        rating: 5,
        duration_months: 5,
        start_date: "2025-09-01",
        end_date: "2026-02-01",
        status: "active",
      },
    ],
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
    students: [
      {
        id: "S6",
        name: "Segun Afolabi",
        email: "segun.afolabi@gmail.com",
        state: "Oyo",
        address: "13 Challenge Rd, Ibadan",
        date_registered: "2025-08-10T10:00:00",
        image: "/student6.jpeg",
        skill: "Car Diagnosis",
        review: "Learnt how to use diagnostic tools effectively.",
        rating: 4,
        duration_months: 8,
        start_date: "2025-08-01",
        end_date: "2026-04-01",
        status: "active",
      },
    ],
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
    students: [
      {
        id: "S7",
        name: "Halima Garba",
        email: "halima.garba@gmail.com",
        state: "Kaduna",
        address: "9 Barnawa Close, Kaduna",
        date_registered: "2025-07-01T10:30:00",
        image: "/student7.jpeg",
        skill: "Bridal Makeup",
        review: "Loved Aisha’s creative approach to modern bridal looks.",
        rating: 5,
        duration_months: 6,
        start_date: "2025-07-01",
        end_date: "2026-01-01",
        status: "active",
      },
    ],
  },
  {
    id: "6",
    name: "John Okon",
    email: "john.okon@gmail.com",
    state: "Akwa Ibom",
    address: "77 Oron Road, Uyo",
    date_registered: "2025-04-30T16:00:00",
    image: "/maxky.jpeg",
    skill: "Carpenter",
    students: [
      {
        id: "S8",
        name: "Bassey Inyang",
        email: "bassey.inyang@gmail.com",
        state: "Akwa Ibom",
        address: "Uyo Main Road, Uyo",
        date_registered: "2025-08-01T09:00:00",
        image: "/student8.jpeg",
        skill: "Cabinet Making",
        review: "John is strict but ensures you learn precision work.",
        rating: 5,
        duration_months: 5,
        start_date: "2025-08-01",
        end_date: "2026-01-01",
        status: "active",
      },
    ],
  },
];
