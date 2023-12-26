import { z } from "zod";

export const MeasurementZodObject = z.object({
  timeStamp: z.coerce.date().optional(),
  systolic: z.coerce.number().min(60).max(250),
  diastolic: z.coerce.number().min(40).max(250),
  heartRate: z.coerce.number().min(40).max(250),
  cause: z.string().optional().nullable(),
});

export const ListOfMeasurementZodObject = z.array(MeasurementZodObject);

export type ListOfMeasurement = z.infer<typeof ListOfMeasurementZodObject>;

export type Measurement = z.infer<typeof MeasurementZodObject>;

export type MeasurementDTO = {
  timeStamp: Date;
  systolic: number;
  diastolic: number;
  heartRate: number;
  isSpecialMeasurement: boolean;
  cause?: string | null;
};
