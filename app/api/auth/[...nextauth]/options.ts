import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import { UserModel } from "@/models";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email && !credentials?.password) {
            throw new Error("Email and password are required");
          }

          await dbConnect();
          const user = await UserModel.findOne({
            email: credentials?.email,
          });

          if (!user) {
            throw new Error("No user found with this email");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials?.password,
            user.password
          );

          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Incorrect password");
          }
        } catch (error) {
          throw new Error(
            error instanceof Error ? error.message : "Sumthing Went Wrong"
          );
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      await dbConnect();
      const existingUser = await UserModel.findOne({ email: user.email });
      if (!existingUser) {
        await UserModel.create({
          name: user.name,
          email: user.email,
          avatar: user.image,
          role: "user",
        });
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.name = user.name;
        token.email = user.email;
        token.avatar = user.avatar;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user._id = token._id as string;
      session.user.name = token.name || "";
      session.user.email = token.email || "";
      return session;
    },
  },
  pages: { signIn: "/signin" },
  session: { strategy: "jwt" },
  secret: process.env.NEXT_SECRET,
};
