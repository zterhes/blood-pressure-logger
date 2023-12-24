import { NextRequest, NextResponse } from "next/server";
import { validateMeasurement } from "../validation";
import { Measurement } from "@/types";
import { saveMeasurement } from "../service";

export async function POST(request: NextRequest) {
  try {
    const measurement = validateMeasurement(await request.json());
    const response = saveMeasurement(measurement);
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.log("error--------------------------");
    console.error(error);
    return new NextResponse(null, { status: 500 });
  }
}
