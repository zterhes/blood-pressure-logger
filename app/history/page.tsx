"use client";

import HistoryData from "@/components/HistoryData";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { fetchHistory } from "../utils/apiService";
import { Button, DateValue, RangeValue, Spinner } from "@nextui-org/react";
import { PrinterIcon } from "lucide-react";
import { DateRangePicker } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";

const Page = () => {
  const [date, setDate] = useState<RangeValue<DateValue>>({
    start: parseDate(new Date().toISOString().split("T")[0]),
    end: parseDate(new Date().toISOString().split("T")[0]),
  });

  const { status, data, error } = useQuery({
    queryKey: [fetchHistory.key, date.start.toString(), date.end.toString()],
    queryFn: () => fetchHistory.fn(date),
  });

  console.log("date", date);
  return (
    <div className="text-center px-8 min-h-[80vh] py-2">
      <div className="flex justify-between mb-5 gap-2">
        <DateRangePicker value={date} onChange={setDate} />
        <Button
          variant="faded"
          radius="sm"
          color="default"
          endContent={<PrinterIcon />}
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
  );
};

export default Page;
