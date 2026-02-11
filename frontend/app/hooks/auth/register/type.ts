// Roles
export type Role = "USER" | "PARTNER" | "CAREER" | "ADMIN";

// ------------------------
// Register Payloads
// ------------------------
interface BaseRegisterPayload {
  email: string;
  password: string;
  role: Role;
}

// USER
export interface UserRegisterPayload extends BaseRegisterPayload {
  role: "USER";
  name: string;
  phone: string;
}

// PARTNER
export interface PartnerRegisterPayload extends BaseRegisterPayload {
  role: "PARTNER";
  first_name: string;
  last_name: string;
  phone: string;
  portfolio?: string;
  artisan: boolean;
  do_you_train: boolean;
  willing_to_train: boolean;
}

// CAREER
export interface CareerRegisterPayload extends BaseRegisterPayload {
  role: "CAREER";
  first_name: string;
  last_name: string;
  phone: string;
  gender: "male" | "female";
}

// ADMIN
export interface AdminRegisterPayload extends BaseRegisterPayload {
  role: "ADMIN";
  name: string;
}

// Union type for all payloads
export type RegisterPayload =
  | UserRegisterPayload
  | PartnerRegisterPayload
  | CareerRegisterPayload
  | AdminRegisterPayload;

// ------------------------
// Register Response
// ------------------------
export interface RegisterResponseData {
  id: string;
  email: string;
  role: Role;
  createdAt: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: RegisterResponseData;
}

export interface UseRegisterResponse {
  signUp: (payload: RegisterPayload) => Promise<void>;
  loading: boolean;
  success: boolean;
  message: string | null;
}
