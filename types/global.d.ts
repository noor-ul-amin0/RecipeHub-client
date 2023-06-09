export {};

declare global {
  interface IRecipe {
    id: number;
    title: string;
    description: string;
    ingredients: string[];
    directions: string[];
    created_at: Date;
    updated_at: Date;
  }
  interface IRecipeFormData {
    title: string;
    description: string;
    ingredients: string[];
    directions: string[];
  }
}
