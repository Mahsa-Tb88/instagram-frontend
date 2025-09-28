import { create } from "zustand";
import type { User } from "../types/types";

type AppStore = {
  initialized: boolean;
  isMobile: boolean;
  setIsMobile(isMobile: boolean): void;
  setInitialized(initialized: boolean): void;
};

export const useAppStore = create<AppStore>((set) => {
  return {
    initialized: false,
    isMobile: false,
    setInitialized(initialized) {
      set({ initialized });
    },
    setIsMobile(isMobile) {
      set({ isMobile });
    },
  };
});

type UserStore = {
  _id: string;
  username: string;
  fullname: string;
  profilePicture: string;
  isLoggedIn: boolean;
  suggestedUsers: User[];
  setUser(user: User): void;
  setSuggestedUsers(suggestedUsers: User[]): void;
  logout(): void;
};

export const useUserStore = create<UserStore>((set) => {
  return {
    _id: "",
    username: "",
    fullname: "",
    profilePicture: "",
    isLoggedIn: false,
    suggestedUsers: [],
    setUser(user) {
      set({ ...user, isLoggedIn: true });
    },
    setSuggestedUsers(suggestedUsers) {
      set({ suggestedUsers });
    },
    logout() {
      set({
        _id: "",
        username: "",
        fullname: "",
        profilePicture: "",
        isLoggedIn: false,
        suggestedUsers: [],
      });
    },
  };
});
