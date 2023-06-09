"use client";
import AddRecipeButton from "@/components/AddRecipeButton/AddRecipeButton";
import Recipes from "@/components/Recipes/Recipes";

export default function Home() {
  return (
    <>
      <Recipes />
      <AddRecipeButton />
    </>
  );
}
