import { loginUser } from "@/services/auth.services";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { type: "email", label: "Email", placeholder: "email" },
        password: { type: "password", label: "Password", placeholder: "pass" },
      },

      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const response = await loginUser({
          email: credentials?.email,
          password: credentials?.password,
        });

        console.log(response, "yasmin");

        if (response.message === "success") {
          return response;
        } else {
          throw new Error(response.message || "Incorrect email or password");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    //  to save in the cookies server encrypted object token (token , user)
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }

      return token;
    },

    // return unser only value in every session (server & client component)
    async session({ session, token }) {
      if (token) {
        session.user = token.user!;
        
      }

      return session;
    },
  },
};

// const token {
//     user : {name , email , role}
//     token : token
// }
