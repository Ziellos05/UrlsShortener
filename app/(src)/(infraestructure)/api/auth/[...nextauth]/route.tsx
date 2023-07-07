import { authConfig } from "@/app/(src)/(application)/auth";
import NextAuth from "next-auth/next";

// API que permite la autenticación con OAuth2.0
const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };