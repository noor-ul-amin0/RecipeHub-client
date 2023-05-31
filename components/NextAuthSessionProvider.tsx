"use client";
import * as React from "react";
import { SessionProvider } from "next-auth/react";

const NextAuthSessionProvider = ({ children, session }) => (
  <SessionProvider session={session}>{children}</SessionProvider>
);

export default NextAuthSessionProvider;
