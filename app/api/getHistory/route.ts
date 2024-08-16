import { getCheckedServerSession } from "@/app/utils/auth/utils";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = true;

export async function GET(request: NextRequest) {
  try {
    const checkedSession = await getCheckedServerSession();
    const from = request.nextUrl.searchParams.get("from");
    const to = request.nextUrl.searchParams.get("to");

    const fromDate = from ? new Date(from) : undefined;

    const toDate = to ? new Date(to) : undefined;
    toDate?.setDate(toDate.getDate() + 1);

    const response = await prisma.measurement.findMany({
      where: {
        userId: checkedSession.user.id,
        timeStamp: {
          gte: from ? new Date(from) : undefined,
          lte: toDate,
        },
      },
    });
    console.log("request.url", fromDate, toDate);
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(null, { status: 500 });
  }
}