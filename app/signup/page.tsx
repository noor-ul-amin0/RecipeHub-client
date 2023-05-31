"use client";
import * as React from "react";
import Loader from "@/components/Loader";
import { Box, Container, TextField, Typography } from "@mui/material";
import Button from "@mui/lab/LoadingButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signUp } from "@/lib/auth";

const SignUp = () => {
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
    try {
      event.preventDefault();
      setIsSubmitting(true);
      const data = new FormData(event.currentTarget);
      const fullName = data.get("fullName");
      const password = data.get("password");
      const email = data.get("email");
      await signUp(fullName, email, password);
      alert("You're successed signed up! Please sign in.");
      router.replace("/signin");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
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
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            type="text"
            margin="normal"
            required
            fullWidth
            label="Full Name"
            name="fullName"
            autoFocus
          />
          <TextField
            type="email"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
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
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default SignUp;
