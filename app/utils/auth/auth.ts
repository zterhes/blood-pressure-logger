import { AuthProviderEnv } from "@/types";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AdapterUser } from "next-auth/adapters";

const authProviderEnv = AuthProviderEnv.parse(process.env);
const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
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
    async session({ session, user }: { session: any; user: AdapterUser }) {
      if (session.user) {
        session.user = user;
      }
      return session;
    },
  },
};
