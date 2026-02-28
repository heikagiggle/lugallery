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
  login: (payload: LoginPayload) => Promise<LoginResponse | null>;
  loading: boolean;
  success:boolean;
  data?: LoginResponse | null;
}
