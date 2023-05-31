"use client";
import * as React from "react";
import Grid from "@mui/material/Grid";
import RecipeCard from "./RecipeCard";

interface RecipeListProps {
  recipes: IRecipe[];
}
const RecipeList: React.FC<RecipeListProps> = ({ recipes = [] }) => {
  return (
    <Grid container spacing={2}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} {...recipe} />
      ))}
    </Grid>
  );
};

export default RecipeList;
