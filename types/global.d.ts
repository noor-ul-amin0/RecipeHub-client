export {}

declare global {
interface IRecipe {
  _id: string;
  title: string;
  description: string;
  ingredients: string[];
  directions: string[];
  thumbnail: string;
  creator: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
}