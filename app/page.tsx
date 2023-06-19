"use client";
import Recipes from "@/components/Recipes/Recipes";
import { getAllRecipes } from "@/lib/recipes";
import { useSession } from "next-auth/react";
import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { useRecipesStore, useSearchRecipesStore } from "@/store/recipe";

const Home: FC = () => {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/signin");
      return;
    },
  });
  const recipes = useRecipesStore((state) => state.recipes);
  const setRecipes = useRecipesStore((state) => state.setRecipes);
  const query = useSearchRecipesStore((state) => state.query);
  const fetchRecipes = async () => {
    try {
      const recipes = await getAllRecipes(session?.user.accessToken, query);
      setRecipes(recipes);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (session?.user.accessToken) fetchRecipes();
  }, [query, session?.user.accessToken]);

  if (status === "loading") return <Loader />;
  return (
    <>
      <Recipes recipes={recipes} />
    </>
  );
};
export default Home;
