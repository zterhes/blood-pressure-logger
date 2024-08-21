import { ListOfMeasurementZodObject } from "@/types";
import { DateValue, RangeValue } from "@nextui-org/react";
import axios from "axios";

const fetchHistory = {
  fn: async (range?: RangeValue<DateValue>) => {
    const response = await axios.get("/api/getHistory", {
      params: {
        from: range?.start.toString(),
        to: range?.end.toString(),
      },
    });
    try {
      return ListOfMeasurementZodObject.parse(response.data);
    } catch (error) {
      console.log("validation error: ", error);
    }
  },
  key: "fetchHistory",
};

export { fetchHistory };
