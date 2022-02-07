import { User } from './user';

type Recipe = {
  id: number;
  userId: string;
  title: string;
  image: string;
  description: string;
  user: User;
};

type CreateRecipe = Omit<Recipe, 'id' | 'user' | 'userId'>;

type UpdateRecipe = Omit<Recipe, 'user' | 'userId'>;

export type { Recipe, CreateRecipe, UpdateRecipe };
