"use client";
import * as React from "react";
import Loader from "@/components/Loader";
import { Box, Container, TextField, Typography } from "@mui/material";
import Button from "@mui/lab/LoadingButton";
import { SignInResponse, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSnackbarStore } from "@/store/snackbar";

const SignIn = () => {
  const { showAlert } = useSnackbarStore();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingSession, setLoadingSession] = useState(true);
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    } else {
      setLoadingSession(false);
    }
  }, [router, status]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const data = new FormData(event.currentTarget);
    const password = data.get("password");
    const email = data.get("email");
    const result: SignInResponse | undefined = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result?.error) {
      showAlert("error", result?.error);
    } else {
      showAlert("success", "Signed in successfully");
      router.replace("/");
    }
    setIsSubmitting(false);
  };
  if (loadingSession || status === "loading" || session) {
    return <Loader />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            type="email"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
          />
          <Button
            type="submit"
            loading={isSubmitting}
            loadingIndicator="Loading..."
            sx={{ mt: 3, mb: 2 }}
            fullWidth
            variant="contained"
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default SignIn;
