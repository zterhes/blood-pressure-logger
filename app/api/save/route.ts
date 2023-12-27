import { NextRequest, NextResponse } from "next/server";
import { validateMeasurement } from "../validation";
import { saveMeasurement } from "../service";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("body:", body);
  try {
    const measurement = validateMeasurement(body);
    // const response = saveMeasurement(measurement);
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
