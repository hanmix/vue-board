export interface NewUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface User extends NewUser {
  id: string;
}
