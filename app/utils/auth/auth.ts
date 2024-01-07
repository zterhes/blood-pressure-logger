import {
  BPLCredentials,
  CredentialsZodObject,
  GitHubEnvShema,
  User,
} from "@/types";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { callLogin } from "../apiService";

const gitHubEnv = GitHubEnvShema.parse(process.env);

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        ToRegistration: {
          type: "button",
          value: "Email + Password => SignIn",
        },
      },
      async authorize(credentials, req) {
        const incomingCredentials = CredentialsZodObject.parse({
          email: credentials?.email,
          password: credentials?.password,
        });
        const user = await callLogin(incomingCredentials);
        if (user) {
          return user;
        } else {
          return null;
        }
      },
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
