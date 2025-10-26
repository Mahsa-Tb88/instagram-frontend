import type { Post, Profile, User } from "../types/types";

type Response = {
  success: boolean;
  message: string;
  code: number;
};

export type InitResponse = Response & { body: { user: User | null; suggested: User[] } };
export type FeedResponse = Response & { body: { count: number; posts: Post[] } };
export type GetPostResponse = Response & { body: Post };
export type GetProfileResponse = Response & { body: Profile };
export type GetUserPostsResponse = Response & { body: { posts: Post[]; count: number } };
