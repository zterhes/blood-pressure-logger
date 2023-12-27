import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { MeasurementZodObject } from "@/types";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("body:", body);
  try {
    const measurement = MeasurementZodObject.parse(body);
    const response = await prisma.measurement.create({
      data: {
        diastolic: measurement.diastolic,
        systolic: measurement.systolic,
        heartRate: measurement.heartRate,
        isSpecial: measurement.cause !== undefined,
        cause: measurement.cause,
        timeStamp: new Date(),
      },
    });
    console.log(response);
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(null, { status: 500 });
  }
}
