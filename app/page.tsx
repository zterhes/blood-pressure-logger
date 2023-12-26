"use client";

import Chart from "@/components/Chart";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <div className="min-h-[57vh]  text-center">
        <Chart />
      </div>
      <div className="mt-32 flex gap-2 justify-between">
        <Button
          radius="full"
          className="bg-red min-h-12 min-w-60 mx-5 font-bold"
          onPress={() => router.push("/history")}
        >
          History
        </Button>
        <Button
          radius="full"
          className="bg-red min-h-12 mx-5 font-bold"
          onPress={() => router.push("/add")}
        >
          +
        </Button>
      </div>
    </div>
  );
}
