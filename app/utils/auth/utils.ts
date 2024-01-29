import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utils/auth/auth";
import { SessionWithUserIdZodObject } from "@/types";

const getCheckedServerSession = async () => {
  const session = await getServerSession(authOptions);
  return SessionWithUserIdZodObject.parse(session);
};

export { getCheckedServerSession };
