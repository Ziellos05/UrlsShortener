import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { redirect } from 'next/navigation'

export const authConfig: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET as string,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
// Tiempo de duración del token de Google OAuth2.0
    session: {
        maxAge: 3600
    }
};
// Si el usuario no está logueado, vuelve a la página de inicio
export async function loginIsRequiredServer() {
    const session = await getServerSession(authConfig);
    if (!session) return redirect("/");
}