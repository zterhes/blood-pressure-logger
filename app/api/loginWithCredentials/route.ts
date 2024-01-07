import prisma from "@/prisma/client";
import { CredentialsZodObject, User } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("credentials", body);
    const parsedBody = CredentialsZodObject.parse(body);
    let response = await prisma.user.findFirst({
      where: { email: parsedBody.email },
    });
    let user: User;
    if (response) {
      if (!(response.password === parsedBody.password)) {
        throw new Error("Wrong password!");
      }
      user = { id: response.id, email: response.email };
    } else {
      response = await prisma.user.create({
        data: {
          email: parsedBody.email,
          password: parsedBody.password,
        },
      });
      user = { id: response.id, email: response.email };
    }

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(null, { status: 500 });
  }
}
