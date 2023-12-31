import { GitHubEnvShema } from "@/types";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const gitHubEnv = GitHubEnvShema.parse(process.env);

export const authOptions = {
  providers: [
    GithubProvider({
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
      clientId: gitHubEnv.GITHUB_CLIENT_ID,
      clientSecret: gitHubEnv.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      return { ...token, ...user };
    },

    async session({ session, token }: { session: any; token: any }) {
      session.user = token as any;
      return session;
    },
  },
};
