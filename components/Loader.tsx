import * as React from "react";
import { Box, CircularProgress } from "@mui/material";

interface LoaderProps {
  size?: number;
  thickness?: number;
  color?: "inherit" | "primary" | "secondary" | "success" | "error";
}

const Loader: React.FC<LoaderProps> = ({
  size = 80,
  thickness = 4,
  color = "success",
}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      justifySelf="center"
      alignSelf="center"
      height="100vh"
    >
      <CircularProgress color={color} size={size} thickness={thickness} />
    </Box>
  );
};

export default Loader;
