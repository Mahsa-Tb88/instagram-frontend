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

export function useLogout() {
  return useMutation({
    mutationFn: () => axios.post("/auth/logout"),
  });
}

export function useUnlikePost() {
  return useMutation({
    mutationFn: (id: string) => axios.put("/posts/" + id + "/unlike", null, { timeout: 3000 }),
  });
}
export function useLikePost() {
  return useMutation({
    mutationFn: (id: string) => axios.put("/posts/" + id + "/like", null, { timeout: 3000 }),
  });
}
export function useFollowUser() {
  return useMutation({
    mutationFn: (targetId: string) =>
      axios.put("/users/" + targetId + "/follow", null, { timeout: 3000 }),
  });
}

export function useUnfollowUser() {
  return useMutation({
    mutationFn: (targetId: string) =>
      axios.put("/users/" + targetId + "/unfollow", null, { timeout: 3000 }),
  });
}

export function useInsertComment() {
  return useMutation({
    mutationFn: (data: { id: string; text: string }) =>
      axios.post("/posts/" + data.id + "/comment", data, { timeout: 3000 }),
  });
}

export function useEditPost() {
  return useMutation({
    mutationFn: (data: { id: string; caption: string }) =>
      axios.post("/posts/" + data.id, data, { timeout: 3000 }),
  });
}
export function useDeletePost() {
  return useMutation({
    mutationFn: (id: string) => axios.delete("/posts/" + id),
  });
}

export function useEditProfile() {
  return useMutation({
    mutationFn: (data: {
      id: string;
      email: string;
      bio: string | undefined;
      fullname: string | undefined;
      password: string;
      profilePicture: string | undefined;
    }) => axios.post("/users/" + data.id + "/profile", data),
  });
}
