export interface AllProfile {
  id: string;
  role: "USER" | "PARTNER" | "CAREER" | "ADMIN";
  userData: {
    id: string;
    userId: string;
    name: string;
    phone: string;
  };
  partner: string;
  career: {
    id: string;
    userId: string;
    first_name: string;
    last_name: string;
    phone: string;
    gender: string;
  };
  admin: { id: string; userId: string; name: string };
  email: string;
  createdAt: string;
}

export interface AllProfileApiResponse {
  success: boolean;
  message: string;
  allProfile: AllProfile;
}

export interface GetAllProfileResponseProps {
  loading: boolean;
  mutate?: () => void;
  data: AllProfile | null;
}

// "data": {
//     "id": "18025a3c-182f-4c11-9da5-acc52083e0ed",
//     "email": "okaforemmanuellaoluchi@gmail.com",
//     "role": "USER",
//     "createdAt": "2026-01-09T13:46:04.233Z",
//     "userData": {
//         "id": "dd492615-01f7-427e-b9d9-6ae6bafa8c0c",
//         "userId": "18025a3c-182f-4c11-9da5-acc52083e0ed",
//         "name": "Emmanuella Oluchi Okafor",
//         "phone": "09020307231"
//     },
//     "partner": null,
//     "career": null,
//     "admin": null
// }
