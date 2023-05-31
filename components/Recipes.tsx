"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { getAllRecipes } from "@/lib/recipes";
import { Container } from "@mui/material";
import RecipeList from "./RecipeList";

export default function Recipes() {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  useEffect(() => {
    fetchRecipes();
  }, []);
  const fetchRecipes = async () => {
    try {
      const data: IRecipe[] = await getAllRecipes();
      setRecipes(data);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
      <RecipeList recipes={recipes} />
    </Container>
  );
}
