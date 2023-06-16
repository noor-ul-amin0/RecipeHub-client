import { getAllRecipes } from "@/lib/recipes";
import RecipeCard from "../RecipeCard/RecipeCard";
import styles from "./Recipes.module.scss";
import AddRecipe from "../AddRecipe/AddRecipe";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Recipes() {
  const session = await getServerSession(nextAuthOptions);
  if (!session) redirect("/signin");
  const recipes: IRecipe[] = await getAllRecipes(session?.user.accessToken);
  return (
    <div className={styles.container}>
      <div className={styles.add_button_container}>
        <AddRecipe />
      </div>
      <div className={styles.row}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} {...recipe} />
        ))}
      </div>
    </div>
  );
}
