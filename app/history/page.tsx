"use client";

import HistoryData from "@/components/HistoryData";
import { ListOfMeasurementZodObject } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const queryFunc = async () => {
  const response = await axios.get("/api/getAll");
  try {
    return ListOfMeasurementZodObject.parse(response.data);
  } catch (error) {
    console.log("validation error: ", error);
  }
};

const Page = () => {
  const { status, data, error } = useQuery({
    queryKey: ["getAll"],
    queryFn: queryFunc,
  });
  return (
    <div className="pt-32 w-full text-center px-8">
      <div>
        {error && "Not able to fetch data. Check your internet connection"}
      </div>
      {data && data.map((value) => <HistoryData measurement={value} />)}
    </div>
  );
};

export default Page;
