import { create } from "zustand";
import type { Conversation, Conversations, conversations, User } from "../types/types";
import { Socket } from "socket.io-client";

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

type MessagingStore = {
  socket: Socket | null;
  conversations: Conversation[];
  isReady: boolean;
  setSocket(socket: Socket | null): void;
  setConversations(conversations: Conversation[]): void;
  setIsReady(isReady: boolean): void;
};
export const useMessagingStore = create<MessagingStore>((set) => {
  return {
    socket: null,
    conversations: [],
    isReady: false,
    setSocket(socket) {
      set({ socket });
    },
    setConversations(conversations) {
      set({ conversations });
    },
    setIsReady(isReady) {
      set({ isReady });
    },
  };
});
