"use client";

import React from "react";
import Logo from "./Logo";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Avatar } from "@nextui-org/react";

const Header = () => {
  const session = useSession();
  const router = useRouter();
  console.log("session: ", session);

  if (session.status === "loading") {
    return <div>Waiting</div>;
  } else if (session.status === "authenticated") {
    if (session.data.user?.image === null) {
      session.data.user.image = undefined;
    }
    return (
      <div className="sticky top-0 items-center justify-between font-mono text-sm z-10">
        <div className="flex w-full align-middle border-b border-red pb-6 pt-8 backdrop-blur-2xl justify-between">
          <Logo />
          <Avatar
            className="mr-9"
            src={session.data.user?.image}
            size="md"
            onClick={() => signOut()}
          />
        </div>
      </div>
    );
  } else {
    signIn();
  }
};

export default Header;
