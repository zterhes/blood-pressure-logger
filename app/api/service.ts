import { MeasurementDTO, Measurement as ZodMeasurement } from "@/types";
import { save } from "./repository";

const saveMeasurement = async (measurement: ZodMeasurement) => {
  const measurementDto: MeasurementDTO = {
    systolic: measurement.systolic,
    diastolic: measurement.diastolic,
    heartRate: measurement.heartRate,
    timeStamp: new Date(),
    cause: measurement.cause,
    isSpecialMeasurement: !(measurement.cause === undefined),
  };
  const dbResponse = await save(measurementDto);
  return dbResponse;
};

export { saveMeasurement };
