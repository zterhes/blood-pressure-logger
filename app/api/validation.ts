import { z } from "zod";

const MeasurementZodObject = z.object({
  systolic: z.coerce.number(),
  diastolic: z.coerce.number(),
  heartRate: z.coerce.number(),
  isSpecialMeasurement: z.boolean().optional(),
  cause: z.string().optional(),
});

export type Measurement = z.infer<typeof MeasurementZodObject>;

const validateMeasurement = (body: unknown) => {
  const isValidData = MeasurementZodObject.parse(body);
  return isValidData;
};

export { MeasurementZodObject, validateMeasurement };
