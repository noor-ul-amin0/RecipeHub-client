import RecipeCard from "../RecipeCard/RecipeCard";
import styles from "./Recipes.module.scss";
import AddRecipe from "../AddRecipe/AddRecipe";
import { FC } from "react";

const Recipes: FC<{ recipes: IRecipe[] }> = ({ recipes = [] }) => {
  return (
    <div className={styles.container}>
      <div className={styles.add_button_container}>
        <AddRecipe />
      </div>
      <div className={styles.row}>
        {!recipes.length && (
          <p className={styles.no_recipes}>No recipes found</p>
        )}
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} {...recipe} />
        ))}
      </div>
    </div>
  );
};
export default Recipes;
