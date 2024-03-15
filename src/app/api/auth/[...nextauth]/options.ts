import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { compare } from "bcrypt";

type SessionProps = {
  session: any;
  token: any;
};

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "text",
          placeholder: "your-cool-eamil",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials, req) {
        try {
          const user = await db.user.findUnique({
            where: { email: credentials?.email },
            select: {
              id: true,
              email: true,
              password: true,
              firstName: true,
              lastName: true,
              birthday: true,
              bio: true,
              profilePic: true,
              createdAt: true,
            },
          }); 

          if (!user) {
            throw new Error("Account not found!");
          }

          const passwordCorrect =
            user.password &&
            (await compare(credentials?.password || "", user.password));

          if (passwordCorrect) {
            return user;
          } else {
            throw new Error("Password incorrect");
          }
        } catch (error) {
          console.error(
            "Error during authentication:",
            error instanceof Error ? error.message : "Unknown error occurred"
          );
          throw new Error(
            error instanceof Error
              ? error.message
              : "Authentication failed. Please try again later."
          );
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session: async ({ session, token }: SessionProps) => {
      if (session?.user) {
        try {
          //
          const user = await db.user.findUnique({
            where: { email: session.user.email },
            select: {
              firstName: true,
              lastName: true,
              birthday: true,
              bio: true,
              profilePic: true,
              createdAt: true,
            },
          }); 

          if (user) { 
            session.user.firstName = user.firstName;
            session.user.lastName = user.lastName;
            session.user.birthday = user.birthday;
            session.user.bio = user.bio;
            session.user.profilePic = user.profilePic;
            session.user.createdAt = user.createdAt;
            session.user.id = token.sub;
          }
        } catch (error) {
          console.error("Error fetching user from the database:", error);
        }
      } 
      return session;
    },  
  },
};
