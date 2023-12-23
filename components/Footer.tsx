import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 flex h-18 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
      <a
        className="pointer-events-none flex place-items-center gap-2"
        href="#"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p className="text-white	text-lg">Developed by </p>
        <Image
          src="/images/logo.png"
          alt="logo"
          width={120}
          height={30}
          priority
        />
      </a>
    </div>
  );
};

export default Footer;
