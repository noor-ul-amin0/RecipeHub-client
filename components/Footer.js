"use client";
import Copyright from "./Copyright";
import Box from "@mui/material/Box";

export default function Footer() {
  return (
    <Box sx={{ p: 6 }} component="footer">
      <Copyright />
    </Box>
  );
}
