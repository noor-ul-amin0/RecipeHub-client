import { getAllRecipes } from "@/lib/recipes";
import RecipeCard from "../RecipeCard/RecipeCard";
import styles from "./Recipes.module.scss";

export default async function Recipes() {
  const recipes: IRecipe[] = await getAllRecipes();
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            description={recipe.description}
          />
        ))}
      </div>
    </div>
  );
}
