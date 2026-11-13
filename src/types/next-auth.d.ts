import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    user: UserDataI;
    token: string;
  }

  interface UserDataI {
    name: string;
    email: string;
    role: string;
  }
}
