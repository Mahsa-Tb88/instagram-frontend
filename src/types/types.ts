export type User = {
  _id: string;
  username: string;
  fullname: string;
  profilePicture: string;
};

export type RegisterErrorObject = {
  username?: string;
  password?: string;
  email?: string;
  confirm?: string;
  fullname?: string;
  bio?: string;
  message?: string;
};

export type RegisterObject = {
  username: string;
  password: string;
  fullname: string;
  email: string;
};

export type ActivationObject = {
  username?: string;
  activationCode?: string;
};

export type LoginErrorObject = {
  username?: string;
  password?: string;
};

export type LoginObject = {
  username?: string;
  password?: string;
  remmember?: boolean;
};

export type Comment = {
  _id: string;
  text: string;
  user: User;
};

export type Post = {
  _id: string;
  caption: string;
  image: string;
  user: User;
  likes: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
};

export type Profile = {
  _id: string;
  username: string;
  fullname: string;
  email: string;
  profilePicture: string;
  followers: string;
  following: string;
  bio: string;
  postCounts: number;
};
