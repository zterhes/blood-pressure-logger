import { AuthProviderEnv } from "@/types";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import { AuthOptions } from "next-auth";

const authProviderEnv = AuthProviderEnv.parse(process.env);
const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: authProviderEnv.GOOGLE_CLIENT_ID,
      clientSecret: authProviderEnv.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
      clientId: authProviderEnv.GITHUB_CLIENT_ID,
      clientSecret: authProviderEnv.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user = user;
      }
      return session;
    },
  },
};
