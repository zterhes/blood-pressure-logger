import { NextRequest, NextResponse } from "next/server";
import { validateMeasurement } from "../validation";
import { saveMeasurement } from "../service";

export async function POST(request: NextRequest) {
  console.log(await request.json());
  try {
    const measurement = validateMeasurement(await request.json());
    const response = saveMeasurement(measurement);
    console.log(response);
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(null, { status: 500 });
  }
}
