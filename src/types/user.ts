type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

type CreateUser = Omit<User, 'id'>;

type Credentials = Pick<User, 'email' | 'password'>;

export type { User, CreateUser, Credentials };
