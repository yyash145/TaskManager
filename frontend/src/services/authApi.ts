import axiosInstance from "./axiosInstance";
import { LoginRequest, RegisterRequest, AuthResponse } from "../models/auth";

export const loginUser = async (data: LoginRequest): Promise<AuthResponse> => {
  const res = await axiosInstance.post<AuthResponse>(
    "auth/login",
    data
  );

  return res.data; // ✅ direct return
};

export const registerUser = async (
  data: RegisterRequest
): Promise<AuthResponse> => {
  const res = await axiosInstance.post<AuthResponse>(
    "auth/register",
    data
  );

  return res.data;
};