"use client";
import React from "react";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";

interface RecipeCardProps {
  thumbnail: string;
  title: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ thumbnail, title }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ height: "90%" }}>
        <CardMedia
          component="div"
          sx={{
            // 16:9
            pt: "56.25%",
          }}
          image={thumbnail}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h5">
            {title}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default RecipeCard;
