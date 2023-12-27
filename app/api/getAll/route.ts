import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await prisma.measurement.findMany();
    console.log(response);
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(null, { status: 500 });
  }
}
