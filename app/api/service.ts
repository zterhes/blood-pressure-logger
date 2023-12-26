import { MeasurementDTO, Measurement as ZodMeasurement } from "@/types";
import { getAll, save } from "./repository";

const saveMeasurement = async (measurement: ZodMeasurement) => {
  const measurementDto = {
    systolic: measurement.systolic,
    diastolic: measurement.diastolic,
    heartRate: measurement.heartRate,
    timeStamp: new Date(),
    cause: measurement.cause,
    isSpecialMeasurement: measurement.cause !== undefined,
  };
  const dbResponse = await save(measurementDto);
  return dbResponse;
};

const getAllMeasurement = async () => await getAll();

export { saveMeasurement, getAllMeasurement };
