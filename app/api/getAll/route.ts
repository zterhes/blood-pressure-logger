import { NextResponse } from "next/server";
import { getAllMeasurement } from "../service";

export async function GET() {
  console.log("findAll endpoint called");
  try {
    const response = await getAllMeasurement();
    console.log("response: ", typeof response[0].timeStamp);
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(null, { status: 500 });
  }
}
