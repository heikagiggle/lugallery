// types/JwtPayload.ts
export interface JwtPayload {
  userId: string;
  email?: string;
  role: "ADMIN" | "PARTNER" | "CAREER" | "USER";
  iat?: number;
  exp?: number;
}
