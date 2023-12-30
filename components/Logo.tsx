"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <div className="ml-9">
      <div>
        <Image
          src="/icon-512x512.png"
          alt="logo"
          width={45}
          height={45}
          priority
          onClick={() => router.push("/")}
        />
      </div>
    </div>
  );
};

export default Logo;
