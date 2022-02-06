export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type CreateUser = Omit<User, 'id'>;

export type Credentials = Pick<User, 'email' | 'password'>;
