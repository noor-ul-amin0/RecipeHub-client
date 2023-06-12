"use client";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
interface RecipeCardProps {
  title: string;
  description: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ title, description }) => {
  return (
    <>
      <Card raised>
        <CardMedia
          sx={{ height: 220 }}
          image="https://recipehub-bucket.s3.ap-south-1.amazonaws.com/WhippedFetaSandwich_lutzflcat.webp"
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Read More</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default RecipeCard;
