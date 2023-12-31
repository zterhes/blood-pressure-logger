import { authOptions } from "@/app/utils/auth/auth";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log("session", session);
  const userid = session.user.id;
  console.log("userid", userid);
  try {
    const response = await prisma.measurement.findMany({
      where: {
        userId: userid,
      },
    });
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(null, { status: 500 });
  }
}
