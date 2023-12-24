import { save } from "./repository";
import { Measurement } from "./validation";

const saveMeasurement = async (measurement: Measurement) => {
  if (measurement.cause === undefined) measurement.isSpecialMeasurement = false;
  const dbResponse = await save(measurement);
  return dbResponse;
};

export { saveMeasurement };
