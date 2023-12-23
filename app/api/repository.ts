import { Measurement } from "@/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const save = (measurement: Measurement) => {
  return prisma.measurement.create({
    data: {
      diastolic: measurement.diastolic,
      systolic: measurement.systolic,
      heartRate: measurement.heartRate,
      isSpecial: measurement.isSpecialMeasurement,
      cause: measurement.cause,
    },
  });
};

export { save };
