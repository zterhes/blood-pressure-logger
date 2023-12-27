import { NextRequest, NextResponse } from "next/server";
import { validateMeasurement } from "../validation";
import { saveMeasurement } from "../service";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("body:", body);
  try {
    const measurement = validateMeasurement(body);
    const response = saveMeasurement(measurement);
    console.log(response);
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(null, { status: 500 });
  }
}
