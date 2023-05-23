"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import Loader from "@/components/common/stateless/Loader";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/lab/LoadingButton";

const UserProfile = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [{ fullName, email, profilePic, _id }, setState] = useState({
    profilePic: "",
    fullName: "",
    email: "",
    _id: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUserProfile = async (email) => {
      try {
        const response = await fetch(`/api/auth/user/profile?email=${email}`);
        if (!response.ok) {
          return router.replace("/auth");
        }
        const data = await response.json();
        setState({
          _id: data._id,
          profilePic: data.profilePic,
          fullName: data.fullName,
          email: data.email,
        });
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (session?.user?.email) fetchUserProfile(session.user.email);
  }, [router, session?.user.email]);
  const handleChange = (event) =>
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const data = new FormData(event.currentTarget);
    const fullName = data.get("fullName");
    const email = data.get("email");
    try {
      const response = await fetch(`/api/auth/user/profile`, {
        method: "PUT",
        body: JSON.stringify({
          _id,
          fullName,
          email,
        }),
      });
      if (response.ok) {
        alert("Profile updated successfully");
        const data = await response.json();
        setState({
          fullName: data.fullName,
          email: data.email,
        });
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isLoading) return <Loader />;
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center" mb={4}>
          Profile details
        </Typography>
        <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <Avatar
              alt={fullName}
              src={profilePic}
              sx={{
                width: 100,
                height: 100,
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
                display: "flex",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              aria-required
              value={fullName}
              onChange={handleChange}
              id="fullName"
              name="fullName"
              label="Full Name"
              fullWidth
              autoComplete="Full Name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              aria-required
              value={email}
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="Email Address"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              loading={isSubmitting}
              loadingIndicator="Loading…"
              className="auth_btn"
              type="submit"
              fullWidth
              variant="contained"
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default UserProfile;
