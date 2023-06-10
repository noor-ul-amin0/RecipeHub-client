"use client";
import { Box, Button, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FC } from "react";

const BoxStyle = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: 30,
  right: 120,
  [theme.breakpoints.down("md")]: {
    bottom: 20,
    right: 8,
  },
  [theme.breakpoints.down("sm")]: {
    bottom: 6,
    right: 15,
  },
}));
interface IAddRecipeButton {
  onClick: () => void;
}
const AddRecipeButton: FC<IAddRecipeButton> = ({ onClick }) => {
  return (
    <>
      <BoxStyle>
        <Button onClick={onClick} variant="contained" startIcon={<AddIcon />}>
          Add Recipe
        </Button>
      </BoxStyle>
    </>
  );
};
export default AddRecipeButton;
