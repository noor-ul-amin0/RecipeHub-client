"use client";
import * as React from "react";
import { SessionProvider } from "next-auth/react";

const NextAuthSessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => <SessionProvider>{children}</SessionProvider>;

export default NextAuthSessionProvider;
