"use client";

import HistoryData from "@/components/HistoryData";
import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { fetchHistory } from "../utils/apiService";
import { Button, DateValue, RangeValue, Spinner } from "@nextui-org/react";
import { FileDown } from "lucide-react";
import { DateRangePicker } from "@nextui-org/react";
import { useReactToPrint } from "react-to-print";
import { HistoryPrintableComponent } from "../../components/HistoryPrintableComponent";
import { useSession } from "next-auth/react";

const Page = () => {
  const [date, setDate] = useState<RangeValue<DateValue>>();
  const session = useSession();

  const { status, data, error } = useQuery({
    queryKey: [fetchHistory.key, date?.start.toString(), date?.end.toString()],
    queryFn: () => fetchHistory.fn(date),
  });

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    removeAfterPrint: true,
  });

  return (
    <>
      <div className="bg-white">
        <HistoryPrintableComponent
          ref={contentToPrint}
          data={data}
          name={session.data?.user?.name}
        />
      </div>
      <div className="text-center px-8 min-h-[80vh] py-2">
        <div className="flex justify-between mb-5 gap-2">
          <DateRangePicker value={date} onChange={setDate} />
          <Button
            variant="faded"
            radius="sm"
            color="default"
            endContent={<FileDown />}
            onPress={() => handlePrint(null, () => contentToPrint.current)}
          />
        </div>
        <div className="grid md:grid-cols-3 gap-2">
          {data &&
            data.map((value, i) => <HistoryData key={i} measurement={value} />)}
        </div>
        <div>
          {status === "pending" && <Spinner color="secondary" />}
          {status === "error" &&
            "Not able to fetch data. Check your internet connection"}
        </div>
      </div>
    </>
  );
};

export default Page;
