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

const downloadPDF = {
  fn: async (range?: RangeValue<DateValue>) => {
    const queryParams = new URLSearchParams();
    if (range?.start) {
      queryParams.set("from", range.start.toString());
    }
    if (range?.end) {
      queryParams.set("to", range.end.toString());
    }

    const response = await fetch(
      "/api/pdf/history" + "?" + queryParams.toString(),
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to download the file");
    }

    const blob = await response.blob();
    const contentDisposition = response.headers.get("content-disposition");
    const filename = contentDisposition
      ? contentDisposition.split("filename=")[1].replace(/"/g, "")
      : "download.pdf";

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

    return true;
  },
  key: "downloadPDF",
};

export { fetchHistory, downloadPDF };
