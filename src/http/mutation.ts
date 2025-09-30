import axios from "axios";
import type { ActivationObject, LoginObject, RegisterObject } from "../types/types";
import { useMutation } from "@tanstack/react-query";

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterObject) => axios.post("/auth/register", data),
  });
}

export function useActivation() {
  return useMutation({
    mutationFn: (data: ActivationObject) => axios.post("auth/activate", data),
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginObject) => axios.post("auth/login", data),
  });
}
