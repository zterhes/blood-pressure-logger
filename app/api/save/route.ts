import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, context) => {
  console.log("req: ", req);
  console.log("context: ", context);
};
