import axios from "axios";
import type { ActivationObject, RegisterObject } from "../types/types";
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
