"use client";
import AddRecipeButton from "@/components/AddRecipeButton";
import Recipes from "@/components/Recipes";

export default function Home() {
  return (
    <>
      <Recipes />
      <AddRecipeButton />
    </>
  );
}
