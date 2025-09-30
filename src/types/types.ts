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
