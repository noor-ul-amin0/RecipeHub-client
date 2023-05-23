"use client";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "@/components/Copyright";
import { createUser } from "@/lib/auth";
import Loader from "@/components/common/stateless/Loader";
import Button from "@mui/lab/LoadingButton";

function AuthPage(props) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [{ isLogin, isLoadingAuth }, setState] = useState({
    isLogin: true,
    isLoadingAuth: false,
  });
  const router = useRouter();

  function switchAuthModeHandler() {
    setState((prevState) => ({
      ...prevState,
      isLogin: !prevState.isLogin,
    }));
  }
  useEffect(() => {
    if (session) {
      router.replace("/");
    } else {
      setIsLoading(false);
    }
  }, [router, session]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      isLoadingAuth: true,
    }));
    const data = new FormData(event.currentTarget);
    const fullName = data.get("fullName");
    const password = data.get("password");
    const email = data.get("email");
    try {
      if (isLogin) {
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });
        if (result.error) {
          alert(result.error);
        } else router.replace("/");
      } else {
        await createUser(fullName, email, password);
        alert("Your account has been created successfully");
        switchAuthModeHandler();
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setState((prevState) => ({
        ...prevState,
        isLoadingAuth: false,
      }));
    }
  };

  if (isLoading) {
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          {isLogin ? <LockOutlinedIcon /> : <LockOpenIcon />}
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLogin ? "Login" : "Register"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {!isLogin && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="fullName"
              label="Full Name"
              name="fullName"
              autoFocus
            />
          )}
          <TextField
            type="email"
            margin="normal"
            required
            fullWidth
            id="email"
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
            id="password"
          />
          <Grid item xs={12}>
            {isLogin ? (
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            ) : (
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            )}
          </Grid>
          <Button
            loading={isLoadingAuth}
            loadingIndicator="Loading…"
            className="auth_btn"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isLogin ? "Login" : "Create Account"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" onClick={switchAuthModeHandler} variant="body2">
                {isLogin
                  ? "Don't have an account? Register"
                  : "Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright {...props} sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}

export default AuthPage;
