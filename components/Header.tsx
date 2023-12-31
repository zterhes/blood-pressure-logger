"use client";

import React from "react";
import Logo from "./Logo";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Avatar } from "@nextui-org/react";

const Header = () => {
  const router = useRouter();
  const session = useSession();
  const avatarImage =
    session.data?.user?.image === null ? undefined : session.data?.user?.image;

  return (
    <div className="sticky top-0 items-center justify-between font-mono text-sm z-10">
      <div className="flex w-full align-middle border-b border-red pb-6 pt-8 backdrop-blur-2xl justify-between">
        <Logo />
        <Avatar
          className="mr-9"
          src={avatarImage}
          size="md"
          onClick={() => signOut()}
        />
      </div>
    </div>
  );
};

export default Header;
