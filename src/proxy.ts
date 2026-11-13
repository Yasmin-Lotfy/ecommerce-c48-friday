import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request });

  const isAuthPages = pathname == "/login" || pathname === "/register";

  if (token && isAuthPages) {
    return NextResponse.redirect(new URL(`${process.env.NEXTAUTH_URL}/products`));
  }

  if (!token && !isAuthPages) {
    return NextResponse.redirect(new URL(`${process.env.NEXTAUTH_URL}/login`));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart",
    "/brands",
    "/categories",
    "/wishlist",
    "/profile",
    "/login",
    "/register",
  ],
};
