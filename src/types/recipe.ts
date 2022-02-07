import { User } from './user';

export type Recipe = {
  id: number;
  userId: string;
  title: string;
  image: string;
  description: string;
  user: User;
};

export type CreateRecipe = Omit<Recipe, 'id' | 'user' | 'userId'>;

export type UpdateRecipe = Omit<Recipe, 'user' | 'userId'>;
