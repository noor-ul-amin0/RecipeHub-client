import * as React from "react";
import Navbar from "@/components/Navbar/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthSessionProvider from "@/components/NextAuthSessionProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RecipeHub",
  description: "RecipeHub",
};

export default function RootLayout({ children }) {
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
