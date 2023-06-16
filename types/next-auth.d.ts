import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: number;
      full_name: string;
      email: string;
      accessToken: string;
    } & DefaultSession["user"];
  }
  interface Credentials {
    redirect: string;
    email: string;
    password: string;
    csrfToken: string;
    callbackUrl: string;
    json: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    email: string;
    full_name: string;
    accessToken: string;
  }
}
