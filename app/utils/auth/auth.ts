import { GitHubEnvShema } from "@/types";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const gitHubEnv = GitHubEnvShema.parse(process.env);

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: gitHubEnv.GITHUB_CLIENT_ID,
      clientSecret: gitHubEnv.GITHUB_CLIENT_SECRET,
    }),
  ],
};
