import * as React from "react";
import { Box, Button, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const BoxStyle = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: 30,
  right: 180,
  [theme.breakpoints.down("md")]: {
    bottom: 20,
    right: 8,
  },
  [theme.breakpoints.down("sm")]: {
    bottom: 6,
    right: 15,
  },
}));
export default function AddRecipeButton() {
  return (
    <BoxStyle>
      <Button variant="contained" startIcon={<AddIcon />}>
        Add Recipe
      </Button>
    </BoxStyle>
  );
}
