export interface LoginRequest {
  Email: string;
  Password: string;
}

export interface RegisterRequest {
  Email: string;
  Password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
}