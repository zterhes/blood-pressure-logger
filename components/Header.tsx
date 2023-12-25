import React from "react";
import Logo from "./Logo";

const Header = () => {
  return (
    <div className="sticky top-0 items-center justify-between font-mono text-sm">
      <div className="flex w-full justify-start align-middle border-b border-red pb-6 pt-8 backdrop-blur-2xl">
        <Logo />
      </div>
    </div>
  );
};

export default Header;
