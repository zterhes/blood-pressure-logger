import { Measurement } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { saveMeasurement } from "../service";
import { validateMeasurement } from "../validation";

export async function GET(request: NextRequest, response: NextResponse) {
  return response.json();
}
