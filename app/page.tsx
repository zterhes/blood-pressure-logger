"use client";

import Chart from "@/components/Chart";
import { Button } from "@nextui-org/react";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <div className="text-center">
        <Chart />
      </div>
      <div className="sticky bottom-24 mt-2 flex justify-between md:justify-end">
        <Button
          radius="full"
          className="bg-red min-h-12 basis-2/3 mx-5 font-bold md:basis-1/6"
          onPress={() => router.push("/history")}
        >
          History
        </Button>
        <Button
          radius="full"
          className="bg-red min-h-12 basis-1/3 mx-5 font-bold md:basis-1/12"
          onPress={() => router.push("/add")}
        >
          +
        </Button>
      </div>
    </div>
  );
}
