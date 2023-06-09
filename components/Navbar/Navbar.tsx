"use client";
import * as React from "react";
import { AppBar, Grid, Toolbar } from "@mui/material";
import { useSession } from "next-auth/react";
import AuthButtons from "./AuthButtons";

const Navbar = () => {
  const { status } = useSession();
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        {status !== "loading" && (
          <Grid
            mr={20}
            container
            direction="row"
            justifyContent="end"
            alignItems="center"
          >
            <AuthButtons />
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
