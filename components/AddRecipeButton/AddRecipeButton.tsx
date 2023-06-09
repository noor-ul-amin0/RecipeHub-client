"use client";
import { Box, Button, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddRecipeDialog from "../AddRecipeDialog/AddRecipeDialog";
import { useState } from "react";

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
const AddRecipeButton = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  return (
    <>
      <BoxStyle>
        <Button
          onClick={handleOpenDialog}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add Recipe
        </Button>
      </BoxStyle>
      <AddRecipeDialog open={dialogOpen} onClose={handleCloseDialog} />
    </>
  );
};
export default AddRecipeButton;
