import { create } from "zustand";

type SearchStore = {
  query: string;
  setQuery: (value: string) => void;
};
interface IRecipesStore {
  recipes: IRecipe[];
  setRecipes: (recipes: IRecipe[]) => void;
  addRecipe: (recipe: IRecipe) => void;
}

export const useSearchRecipesStore = create<SearchStore>((set) => ({
  query: "",
  setQuery: (value: string) => set(() => ({ query: value })),
}));

export const useRecipesStore = create<IRecipesStore>((set) => ({
  recipes: [],
  setRecipes: (recipes) => set({ recipes }),
  addRecipe: (recipe) =>
    set((state) => ({
      recipes: [recipe, ...state.recipes],
    })),
}));
