import { authConfig  } from "@/app/(src)/(application)/auth";
import NextAuth from "next-auth/next";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };