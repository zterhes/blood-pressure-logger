import { MeasurementDTO } from "@/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const save = (measurement: MeasurementDTO) => {
  return prisma.measurement.create({
    data: {
      diastolic: measurement.diastolic,
      systolic: measurement.diastolic,
      heartRate: measurement.heartRate,
      isSpecial: measurement.isSpecialMeasurement,
      cause: measurement.cause,
      timeStamp: measurement.timeStamp,
    },
  });
};

const getAll = () => {
  return prisma.measurement.findMany();
};

export { save, getAll };
