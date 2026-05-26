import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoutes,
  UserRole,
} from "./lib/auth-utils";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value || null;

  let userRole: UserRole | null = null;

  if (accessToken) {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }
    try {
      const verifiedToken = jwt.verify(
        accessToken,
        process.env.JWT_SECRET as Secret,
      ) as JwtPayload;

      userRole = verifiedToken.role;
    } catch (error) {
      console.error("JWT verification failed:", error);

      const response = NextResponse.redirect(new URL("/login", request.url));

      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");

      return response;
    }
  }

  const routeOwner = getRouteOwner(pathname);

  //path = /doctor/appointments => "DOCTOR"
  //path = /my-profile => "PATIENT"

  const isAuth = isAuthRoutes(pathname);

  //rule-1: user is logged in and trying to access auth route
  if (accessToken && isAuth) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
    );
  }

  //rule-2: user is trying to access public route
  if (routeOwner === null) {
    return NextResponse.next();
  }

  //rule 1 & 2 open for public and auth routes
  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  //rule-3: user is trying to access common protected route
  if (routeOwner === "COMMON") {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  //rule-4: user is trying to access rule based protected route

  if (
    routeOwner === "ADMIN" ||
    routeOwner === "DOCTOR" ||
    routeOwner === "PATIENT"
  ) {
    if (userRole !== routeOwner) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
      );
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
