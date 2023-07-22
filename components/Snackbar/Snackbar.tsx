"use client";
import React from "react";
import { Alert, Snackbar as MuiSnackbar } from "@mui/material";
import { useSnackbarStore } from "@/store/snackbar";

const Snackbar: React.FC = () => {
  const {
    closeAlert,
    alert: { open, type, message },
  } = useSnackbarStore();

  const handleClose = () => {
    closeAlert();
  };

  return (
    <MuiSnackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
