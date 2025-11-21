export type Tag = string;

export interface Ingredient {
  name: string;
  amount?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  ingredients: Ingredient[];
  steps: string[];
  cookingTime: number; // minutes
  servings: number;
  tags: Tag[]; // categories/tags
  favorite?: boolean;
}
