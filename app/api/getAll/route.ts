import { authOptions } from "@/app/utils/auth/auth";
import { getCheckedServerSession } from "@/app/utils/auth/utils";
import prisma from "@/prisma/client";
import { SessionWithUserIdZodObject } from "@/types";
import { DefaultUser } from "next-auth";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

type MyUser = DefaultUser & { id: string };

export async function GET() {
  try {
    const checkedSession = await getCheckedServerSession();
    const response = await prisma.measurement.findMany({
      where: {
        userId: checkedSession.user.id,
      },
    });
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(null, { status: 500 });
  }
}
