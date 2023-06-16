"use client";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FC } from "react";

interface IAddRecipeButton {
  onClick: () => void;
}
const AddRecipeButton: FC<IAddRecipeButton> = ({ onClick }) => {
  return (
    <>
      <Box>
        <Button onClick={onClick} variant="contained" startIcon={<AddIcon />}>
          Add Recipe
        </Button>
      </Box>
    </>
  );
};
export default AddRecipeButton;
