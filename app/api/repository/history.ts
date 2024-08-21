import prisma from "../../../prisma/client";
export const findHistory = async (
  userId: string,
  from?: Date,
  toDate?: Date
) => {
  return await prisma.measurement.findMany({
    where: {
      userId: userId,
      timeStamp: {
        gte: from ? new Date(from) : undefined,
        lte: toDate,
      },
    },
  });
};
