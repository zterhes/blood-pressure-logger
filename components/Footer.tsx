import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="sticky bottom-0 flex h-24  w-full items-end justify-center backdrop-blur-2xl ">
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
          height={16}
          priority
        />
      </a>
    </div>
  );
};

export default Footer;
