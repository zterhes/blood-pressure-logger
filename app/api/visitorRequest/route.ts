import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getCheckedServerSession } from "@/app/utils/auth/utils";
import { VisitorRequestBodyZodObject } from "@/types";

export const revalidate = true;

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const session = await getCheckedServerSession();
    const parsedBody = VisitorRequestBodyZodObject.parse(body);
    await prisma.visitorRequest.create({
      data: {
        requesterId: parsedBody.requesterId,
        userId: parsedBody.userId,
        read: false,
        approved: "PENDING",
      },
    });

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(null, { status: 500 });
  }
}
