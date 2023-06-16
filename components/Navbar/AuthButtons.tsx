"use client";
import * as React from "react";
import { Button } from "@mui/material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

const AuthButtons = ({ session }: { session: Session | null }) => {
  const router = useRouter();
  return (
    <>
      {session?.user ? (
        <Button
          color="inherit"
          onClick={() => signOut({ redirect: true, callbackUrl: "/signin" })}
        >
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
