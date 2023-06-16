"use client";
import { AppBar, Container, Grid, Toolbar } from "@mui/material";
import { useSession } from "next-auth/react";
import AuthButtons from "./AuthButtons";
import SearchBox from "./SearchBox";

const Navbar = () => {
  const { status, data: session } = useSession();
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar>
          <SearchBox />
          {status !== "loading" && (
            <Grid
              mr={20}
              container
              direction="row"
              justifyContent="end"
              alignItems="center"
            >
              <AuthButtons session={session} />
            </Grid>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
