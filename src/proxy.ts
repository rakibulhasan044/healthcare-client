import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface userInterface {
  id: string | null | undefined;
  email: string;
  role: "ADMIN" | "DOCTOR" | "PATIENT";
  exp: number;
  iat: number;
}

const roleBasedRoutes = {
    "ADMIN": ['/admin/dashboard', 'admin/manage-doctor', '/admin/manage-patients'],
    "DOCTOR": ['/doctor/dashboard'],
    "PATIENT": ['/patient/dashboard', 'patient/appointments', '/patient/medical-records']

}

const authRoutes = ["/login", "/register", "/forgot-password"];
export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const { pathname } = request.nextUrl;

  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url),
    );
  }

  let user: userInterface | null = null;
  if (accessToken) {
    try {
      user = jwtDecode(accessToken);
    } catch (error) {
      console.log("error decoding access token", error);
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url),
      );
    }
  }

  
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path", "/login", "/register", "/forgot-password"],
};
