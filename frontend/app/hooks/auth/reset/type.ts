export interface ForgotPayload {
  email: string;
}

export interface ForgotResponseData {
  message: string;
}

export interface ForgotResponse {
  message: string;
  data: ForgotResponseData;
}
export interface UseForgotResponse {
  forgot: (payload: ForgotPayload) => Promise<void>;
  loading: boolean;
  message: string;
  success: boolean;
}

//code
export interface CodePayload {
  email: string;
  otp: string;
}

export interface CodeResponseData {
  success: boolean;
  message: string;
  data: string;
}

export interface CodeResponse {
  message: string;
  data: CodeResponseData;
}

export interface UseCodeResponse {
  code: (payload: CodePayload) => Promise<void>;
  loading: boolean;
  message: string;
  success: boolean;
}

//reset
export interface ResetPayload {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ResetResponseData {
  message: string;
}

export interface ResetResponse {
  message: string;
  data: ResetResponseData;
}
export interface UseResetResponse {
  reset: (payload: ResetPayload) => Promise<void>;
  loading: boolean;
  message: string;
  success: boolean;
}

export interface PasswordPayload {
  old_password: string;
  new_password: string;
}

export interface PasswordResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    oldPassword: string;
    newPasword?: string;
  };
}

export interface UsePasswordResponse {
  loading: boolean;
  success: boolean;
  data: PasswordResponse | null;
  handlePassword: (payload: PasswordPayload) => Promise<void>;
}

