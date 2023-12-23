import React from "react";
import Logo from "./Logo";

const Header = () => {
  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
      <div className="fixed left-0 top-0 flex w-full justify-start align-middle border-b border-red pb-6 pt-8 backdrop-blur-2xl">
        <Logo />
      </div>
    </div>
  );
};

export default Header;
