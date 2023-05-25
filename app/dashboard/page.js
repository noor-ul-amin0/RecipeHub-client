"use client";
import { getUserRecipes } from "@/lib/recipes";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default async function Dashboard() {
  const [recipes, setRecipes] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      getUserRecipes(session.user._id)
        .then((recipes) => {
          setRecipes(recipes);
        })
        .catch((error) => alert(error.message));
    }
  }, [session]);

  return recipes.length > 0 ? (
    recipes.map((recipe) => (
      <Card key={recipe._id}>
        <CardContent>
          <Typography variant="h5" align="center">
            {recipe.name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined" color="primary">
            View
          </Button>
        </CardActions>
      </Card>
    ))
  ) : (
    <Card>
      <CardContent>
        <Typography variant="h5" align="center">
          No Recipes exist
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => {}} variant="outlined">
          Add a Recipe
        </Button>
      </CardActions>
    </Card>
  );
}
