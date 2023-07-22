import NextAuth from "next-auth";
import { AuthOptions, Session } from "next-auth/core/types";
import { JWT } from "next-auth/jwt/types";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 2, // 2 days
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: {
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
      async authorize(credentials: Credentials) {
        const response = await fetch(`http://localhost:8080/api/users/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });
        const { success, data, message } = await response.json();
        if (!response.ok || !success) {
          throw new Error(message);
        }
        return data;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }): Promise<JWT> => {
      if (user) {
        token.email = user.email;
        token.full_name = user.full_name;
        token.id = user.id;
        token.accessToken = user.token;
      }

      return token;
    },
    async session({ session, token }): Promise<Session> {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.full_name = token.full_name;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
