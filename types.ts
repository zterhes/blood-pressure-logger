import { z } from "zod";

export const MeasurementZodObject = z.object({
  systolic: z.coerce.number().min(60).max(250),
  diastolic: z.coerce.number().min(40).max(250),
  heartRate: z.coerce.number().min(40).max(250),
  cause: z.string().optional(),
});

export type Measurement = z.infer<typeof MeasurementZodObject>;

export type MeasurementDTO = {
  timeStamp: Date;
  systolic: number;
  diastolic: number;
  heartRate: number;
  isSpecialMeasurement: boolean;
  cause?: string;
};
