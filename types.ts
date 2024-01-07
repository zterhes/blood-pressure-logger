import { z } from "zod";

export const MeasurementZodObject = z.object({
  timeStamp: z.coerce.date().optional(),
  systolic: z.coerce.number().min(60).max(250),
  diastolic: z.coerce.number().min(40).max(250),
  heartRate: z.coerce.number().min(40).max(250),
  cause: z.string().optional().nullable(),
});

export const GitHubEnvShema = z.object({
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
});

const VercelUrlEnvShema = z.object({
  VERCEL_URL: z.string(),
});

export const useVercelUrl = () => VercelUrlEnvShema.parse(process.env);

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

export const UserZodObject = z.object({
  id: z.string(),
  email: z.string().email(),
});

export type User = z.infer<typeof UserZodObject>;

export const CredentialsZodObject = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type BPLCredentials = z.infer<typeof CredentialsZodObject>;
