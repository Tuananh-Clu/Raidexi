export type UserData = {
  id?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  createdAt?: string;
  hashPassword?: string;
  imageUrl?: string | null;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type RegisterParams = LoginParams & {
  fullname: string;
  typeLogin: string;
};
