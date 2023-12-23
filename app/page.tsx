"use client";

import Logo from "@/components/Logo";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <Button
        radius="full"
        className="bg-red"
        onPress={() => router.push("/add")}
      >
        +
      </Button>
    </div>
  );
}
