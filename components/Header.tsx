"use client";

import React from "react";
import Logo from "./Logo";
import { signOut, useSession } from "next-auth/react";
import { Avatar } from "@nextui-org/react";
import AvatarDropDown from "./AvatarDropDown";

const Header = () => {
  return (
    <div className="sticky top-0 items-center justify-between font-mono text-sm z-10">
      <div className="flex w-full align-middle border-b border-red pb-6 pt-8 pr-8 backdrop-blur-2xl justify-between">
        <Logo />
        <AvatarDropDown />
      </div>
    </div>
  );
};

export default Header;
