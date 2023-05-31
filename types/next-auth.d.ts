import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      _id: string;
      fullName: string;
      email: string;
      avatar: string;
      createdAt: Date;
      updatedAt: Date;
      __v: number;
    } & DefaultSession["user"]
  }
  interface Credentials {
    redirect:    string;
    email:       string;
    password:    string;
    csrfToken:   string;
    callbackUrl: string;
    json:        string;
}
}
