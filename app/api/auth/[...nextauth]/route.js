// import User from "@/models/user";
import { findUser } from "@/lib/auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      type: "credentials",
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
        const response = await fetch(
          `${process.env.NEXTAUTH_URL}/api/auth/login`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );
        const { success, data, message } = await response.json();
        if (!response.ok || !success) {
          throw new Error(message);
        }
        return data;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const user = await findUser({ email: session?.user.email });
      session.user = user;
      return session;
    },
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
