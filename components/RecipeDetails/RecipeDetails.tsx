"use client";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import Image from "next/image";

const RecipeDetails = ({ recipe }: any) => {
  return (
    <Container sx={{ mt: "10px" }}>
      <Image
        src={
          "https://recipehub-bucket.s3.ap-south-1.amazonaws.com/WhippedFetaSandwich_lutzflcat.webp"
        }
        alt={recipe.title}
        width={700}
        height={500}
      />
      <Typography variant="h4" gutterBottom>
        {recipe.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {recipe.description}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Ingredients:
      </Typography>
      <List>
        {recipe.ingredients.map((ingredient: string, index: number) => (
          <ListItem key={index}>
            <ListItemText primary={ingredient} />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" gutterBottom>
        Directions:
      </Typography>
      <ol>
        {recipe.directions.map((direction: string, index: number) => (
          <li key={index}>{direction}</li>
        ))}
      </ol>
    </Container>
  );
};

export default RecipeDetails;
