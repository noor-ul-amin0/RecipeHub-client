"use client";
import { useState } from "react";
import AddRecipeButton from "./AddRecipeButton";
import AddRecipeDialog from "../AddRecipeDialog/AddRecipeDialog";

export default function AddRecipe() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  return (
    <>
      <AddRecipeButton onClick={handleOpenDialog} />
      <AddRecipeDialog open={dialogOpen} onClose={handleCloseDialog} />
    </>
  );
}
