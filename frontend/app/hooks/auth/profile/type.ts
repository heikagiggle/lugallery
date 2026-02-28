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

export interface UpdateProfilePayload {
  name?: string;
  image?: string;
  gender?: string;
  phone?: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: {
    email: string;
    role: string;
  };
}
export interface UseUpdateProfileResponse {
  updateProfile: (payload: UpdateProfilePayload) => Promise<void>;
  loading: boolean;
  data?: UpdateProfileResponse | null;
}
