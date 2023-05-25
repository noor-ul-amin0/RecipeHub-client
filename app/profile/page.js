"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Container,
  Grid,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Button from "@mui/lab/LoadingButton";
import Loader from "@/components/common/stateless/Loader";

const UserProfile = () => {
  const router = useRouter();
  const [{ fullName, email, profilePic, _id }, setState] = useState({
    profilePic: "",
    fullName: "",
    email: "",
    _id: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session, status, update } = useSession();

  useEffect(() => {
    if (session?.user) {
      setState({
        _id: session.user._id,
        profilePic: session.user.profilePic,
        fullName: session.user.fullName,
        email: session.user.email,
      });
    }
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [router, session?.user, status]);
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
    try {
      const response = await fetch(`/api/auth/user/profile`, {
        method: "PUT",
        body: JSON.stringify({
          _id,
          fullName,
        }),
      });
      if (response.ok) {
        const { data } = await response.json();
        await update(data);
        alert("Profile updated successfully");
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
  const isDirty = useMemo(() => {
    return fullName.toLowerCase() !== session?.user?.fullName.toLowerCase();
  }, [fullName, session?.user?.fullName]);
  if (status === "loading") {
    return <Loader />;
  }
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
            <Tooltip
              placement="top"
              title="You can't change your email address"
            >
              <TextField
                required
                aria-required
                value={email}
                disabled
                type="email"
                id="email"
                name="email"
                label="Email"
                fullWidth
                autoComplete="Email Address"
                variant="standard"
              />
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled={!isDirty}
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
