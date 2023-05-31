"use client";
import * as React from "react";
import { Button } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthButtons = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <>
      {session?.user ? (
        <Button
          color="inherit"
          onClick={() => signOut({ callbackUrl: "/signin" })}
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
