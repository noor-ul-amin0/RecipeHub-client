import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RecipeHub",
  description: "RecipeHub",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
