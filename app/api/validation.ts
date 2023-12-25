import { z } from "zod";
import { MeasurementZodObject } from "@/types";

const validateMeasurement = (body: unknown) => {
  const isValidData = MeasurementZodObject.parse(body);
  return isValidData;
};

export { MeasurementZodObject, validateMeasurement };
