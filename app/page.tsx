"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <Button
        radius="full"
        className="bg-red absolute bottom-40 left-8 min-h-12 min-w-60"
        onPress={() => router.push("/history")}
      >
        History
      </Button>
      <Button
        radius="full"
        className="bg-red absolute bottom-40 right-8 min-h-12"
        onPress={() => router.push("/add")}
      >
        +
      </Button>
    </div>
  );
}
