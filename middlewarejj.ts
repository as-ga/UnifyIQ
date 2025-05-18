import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/:path*", "/", "/profile", "/signup", "/login"],
};
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXT_SECRET });
  const pathname = req.nextUrl.pathname;

  const publicUrls = ["/signup", "/signin"];
  const protectedUrls = ["/profile", "/admin", "/dashboard"];

  if (token && publicUrls.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && protectedUrls.includes(pathname)) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  //   if (token?.role != "admin" && url.pathname.startsWith("/admin")) {
  //     return NextResponse.redirect(new URL("/", req.url));
  //   }

  return NextResponse.next();
}
