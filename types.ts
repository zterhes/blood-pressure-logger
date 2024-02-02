import { z } from "zod";

export const MeasurementZodObject = z.object({
  timeStamp: z.coerce.date().optional(),
  systolic: z.coerce.number().min(60).max(250),
  diastolic: z.coerce.number().min(40).max(250),
  heartRate: z.coerce.number().min(40).max(250),
  cause: z.string().optional().nullable(),
});

export const AuthProviderEnv = z.object({
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
});

const VercelUrlEnvShema = z.object({
  VERCEL_URL: z.string(),
});

export const getVercelUrl = () => VercelUrlEnvShema.parse(process.env);

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

export const SessionWithUserIdZodObject = z.object({
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean().nullable(),
    image: z.string(),
  }),
});

export const VisitorRequestBodyZodObject = z.object({
  requesterId: z.string(),
  userId: z.string(),
});

const ApprovedEnumZodObject = z
  .enum(["PENDING", "APPROVED", "REJECTED"])
  .default("PENDING");

export const VisitorRequestDBZodObject = z.object({
  id: z.string(),
  requesterId: z.string(),
  userId: z.string(),
  read: z.boolean(),
  approved: ApprovedEnumZodObject,
});

// export enum ApprovedEnum = z.infer<typeof MeasurementZodObject>;
