// app/admin/dashboard/users/components/data.ts

export interface Engagement {
  id: string;
  artisanName: string;
  artisanTitle: string;
  review: string;
  rating: number;
  date: string; 
}

export const engagementData: Engagement[] = [
  {
    id: "1",
    artisanName: "Adeola Martins",
    artisanTitle: "Tailor",
    review: "Very professional and delivered ahead of schedule.  Fixed the leak quickly, but arrived late.",
    rating: 5,
    date: "2025-10-02",
  },
  {
    id: "2",
    artisanName: "Emeka Uzo",
    artisanTitle: "Plumber",
    review: "Fixed the leak quickly, but arrived late.",
    rating: 3,
    date: "2025-09-18",
  },
  {
    id: "3",
    artisanName: "Hauwa Bello",
    artisanTitle: "Makeup Artist",
    review: "Excellent service, friendly and patient.",
    rating: 4,
    date: "2025-09-10",
  },
];
