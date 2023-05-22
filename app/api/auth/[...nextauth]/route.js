// import User from "@/models/user";
import { verifyPassword } from "@/lib/auth";
import { connectDatabase } from "@/lib/db";
import User from "@/models/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "Please enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Please enter your password",
        },
      },
      async authorize(credentials) {
        await connectDatabase();
        const user = await User.findOne({
          email: credentials.email,
        }).select("+password -createdAt -updatedAt");
        if (
          !user ||
          !(await verifyPassword(credentials.password, user.password))
        ) {
          throw new Error("Invalid email or password");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    signIn({ user }) {
      if (user) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
  },
});

export { handler as GET, handler as POST };
