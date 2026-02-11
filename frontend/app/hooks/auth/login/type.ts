export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    role: string;
  };
}
export interface UseLoginResponse {
  login: (payload: LoginPayload) => Promise<void>;
  loading: boolean;
  data?: LoginResponse | null;
}
