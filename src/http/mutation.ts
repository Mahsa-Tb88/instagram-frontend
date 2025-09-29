import axios from "axios";
import type { RegisterObject } from "../types/types";
import { useMutation } from "@tanstack/react-query";

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterObject) => axios.post("/auth/register", data),
  });
}
