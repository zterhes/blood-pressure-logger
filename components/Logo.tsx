import Image from "next/image";

const Logo = () => {
  return (
    <div className="pl-9">
      <div>
        <Image
          src="/icon-512x512.png"
          alt="logo"
          width={45}
          height={45}
          priority
        />
      </div>
    </div>
  );
};

export default Logo;
