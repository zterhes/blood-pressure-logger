"use client";

import HistoryData from "@/components/HistoryData";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchAll } from "../utils/apiService";

const Page = () => {
  const { status, data, error } = useQuery({
    queryKey: ["getAll"],
    queryFn: fetchAll,
  });
  console.log("error: ", error);
  console.log("data: ", data);
  return (
    <div className=" w-full text-center px-8 min-h-[80vh]">
      <div>
        {error && "Not able to fetch data. Check your internet connection"}
      </div>
      {data &&
        data.map((value, i) => <HistoryData key={i} measurement={value} />)}
    </div>
  );
};

export default Page;
