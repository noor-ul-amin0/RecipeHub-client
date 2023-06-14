import * as React from "react";
import Navbar from "@/components/Navbar/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthSessionProvider from "@/components/NextAuthSessionProvider";
import { Metadata } from "next";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RecipeHub",
  description: "RecipeHub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthSessionProvider>
          <main>
            <Navbar />
            {children}
          </main>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
