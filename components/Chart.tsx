import { fetchAll } from "@/app/utils/apiService";
import { ListOfMeasurement, Measurement } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AreaChart, Card, Title } from "@tremor/react";

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
  }
};

const valueFormatter = function (number: number) {
  return new Intl.NumberFormat("us").format(number).toString();
};

const Chart = () => {
  const { status, data, error } = useQuery({
    queryKey: [fetchAll.key],
    queryFn: fetchAll.fn,
  });

  const mappedHistory = dataMapper(data);

  return (
    <Card>
      {error ? (
        "Not able to load data. Try again later"
      ) : mappedHistory ? (
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
      ) : (
        "Error in data, please connect the developer"
      )}
    </Card>
  );
};

export default Chart;
