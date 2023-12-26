import { fetchAll } from "@/app/utils/apiService";
import { ListOfMeasurement, Measurement } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AreaChart, Card, Title } from "@tremor/react";
import { string } from "zod";

const chartdata = [
  {
    date: "Jan 22",
    SemiAnalysis: 2890,
    "The Pragmatic Engineer": 2338,
  },
  {
    date: "Feb 22",
    SemiAnalysis: 2756,
    "The Pragmatic Engineer": 2103,
  },
  {
    date: "Mar 22",
    SemiAnalysis: 3322,
    "The Pragmatic Engineer": 2194,
  },
  {
    date: "Apr 22",
    SemiAnalysis: 3470,
    "The Pragmatic Engineer": 2108,
  },
  {
    date: "May 22",
    SemiAnalysis: 3475,
    "The Pragmatic Engineer": 1812,
  },
  {
    date: "Jun 22",
    SemiAnalysis: 3129,
    "The Pragmatic Engineer": 1726,
  },
];

type DataForBloodPressure = {
  date: string;
  Systolic: number;
  Diastolic: number;
  HeartRate: number;
};

const dataMapper = (listOfMeasurement: ListOfMeasurement | undefined) => {
  if (listOfMeasurement) {
    const mappedList = listOfMeasurement.map((measurement) => {
      const data: DataForBloodPressure = {
        date:
          measurement.timeStamp?.toLocaleString("default", { month: "short" }) +
          "/" +
          measurement.timeStamp?.getDate(),
        Diastolic: measurement.diastolic,
        Systolic: measurement.systolic,
        HeartRate: measurement.heartRate,
      };
      return data;
    });
    return mappedList;
  } else {
    throw new Error("Nothing to map");
  }
};

const valueFormatter = function (number: number) {
  return new Intl.NumberFormat("us").format(number).toString();
};

const Chart = () => {
  const { status, data, error } = useQuery({
    queryKey: ["getAll"],
    queryFn: fetchAll,
  });

  const mappedHistory = dataMapper(data);

  return (
    <Card>
      {error ? (
        "Not able to load data. Try again later"
      ) : (
        <div>
          <div>
            <Title>Blood Pressure (mmHg)</Title>
            <AreaChart
              className="h-72 mt-4"
              data={mappedHistory}
              index="date"
              categories={["Systolic", "Diastolic"]}
              colors={["indigo", "cyan"]}
              valueFormatter={valueFormatter}
            />
          </div>
          <div>
            <Title>Heart Rate (beat/min)</Title>
            <AreaChart
              className="h-72 mt-4"
              data={mappedHistory}
              index="date"
              categories={["HeartRate"]}
              colors={["indigo", "cyan"]}
              valueFormatter={valueFormatter}
            />
          </div>
        </div>
      )}
    </Card>
  );
};

export default Chart;
