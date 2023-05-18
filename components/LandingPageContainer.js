"use client";
import { Box, Typography } from "@mui/material";
export default function LandingPageContainer() {
  return (
    <Box className="w-full flex-center flex-col">
      <Typography variant="h2" className="head_text text-center" gutterBottom>
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">
          Discover New Recipes
        </span>
      </Typography>
      <p className="desc text-center">
        Explore a collection of delicious recipes shared by food enthusiasts.
        Unlock your culinary creativity with RecipeHub's diverse recipe
        database.
      </p>
    </Box>
  );
}
