"use client";
import * as React from "react";
import { Button } from "@mui/material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useSnackbarStore } from "@/store/snackbar";

const AuthButtons = ({ session }: { session: Session | null }) => {
  const { showAlert } = useSnackbarStore();
  const router = useRouter();
  const signOutUser = () => {
    signOut({ redirect: true, callbackUrl: "/signin" }).then(() =>
      showAlert("success", "Logged out successfully")
    );
  };
  return (
    <>
      {session?.user ? (
        <Button color="inherit" onClick={signOutUser}>
          Logout
        </Button>
      ) : (
        <>
          <Button color="inherit" onClick={() => router.push("/signin")}>
            Sign in
          </Button>
          <Button color="inherit" onClick={() => router.push("/signup")}>
            Sign up
          </Button>
        </>
      )}
    </>
  );
};

export default AuthButtons;
