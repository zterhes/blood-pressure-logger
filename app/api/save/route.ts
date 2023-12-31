import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { MeasurementZodObject } from "@/types";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/utils/auth/auth";
import { getServerSession } from "next-auth/next";

export const revalidate = true;

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const body = await request.json();
  try {
    const measurement = MeasurementZodObject.parse(body);
    await prisma.measurement.create({
      data: {
        userId: session.user.id,
        diastolic: measurement.diastolic,
        systolic: measurement.systolic,
        heartRate: measurement.heartRate,
        isSpecial: measurement.cause !== undefined,
        cause: measurement.cause,
        timeStamp: new Date(),
      },
    });
    revalidatePath("/api/getAll");
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(null, { status: 500 });
  }
}
