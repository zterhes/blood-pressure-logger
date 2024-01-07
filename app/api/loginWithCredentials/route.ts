import prisma from "@/prisma/client";
import { CredentialsZodObject } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("credentials", body);
    const parsedBody = CredentialsZodObject.parse(body);
    let user = await prisma.user.findFirst({
      where: { email: parsedBody.email },
    });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: parsedBody.email,
          password: parsedBody.password,
        },
      });
    }

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(null, { status: 500 });
  }
}
