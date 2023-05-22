import { Box, CircularProgress } from "@mui/material";

export default function Loader() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      justifySelf="center"
      alignSelf="center"
      height="100vh"
    >
      <CircularProgress color="success" size={80} thickness={4} />
    </Box>
  );
}
