"use client";

import { signIn, useSession } from "next-auth/react";
import React from "react";

const Auth = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();

  console.log(session);

  if (session.status === "loading") {
    return <div></div>;
  } else if (session.status === "authenticated") {
    return children;
  } else {
    signIn();
  }
};

export default Auth;
