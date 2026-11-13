import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getOutToken() {
  const cookieStore = await cookies();

  // On HTTPS (production) NextAuth prefixes the cookie with "__Secure-"
  const token =
    cookieStore.get("__Secure-next-auth.session-token")?.value ??
    cookieStore.get("next-auth.session-token")?.value;

  if (!token) {
    return null;
  }

  const decodedToken = await decode({
    token: token,
    secret: (process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET)!,
  });

  if (!decodedToken?.token) {
    return null;
  }

  return decodedToken.token as string;
}
