/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import z from "zod";
import { parse } from "cookie";
import { redirect } from "next/navigation";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { getDefaultDashboardRoute, isValidRedirectForRole, UserRole } from "@/lib/auth-utils";

const loginValidationZodSchema = z.object({
  email: z.string({ error: "Invalid email address" }),
  password: z
    .string()
    .min(6, {
      error: "password is required and must be 6 characters long",
    })
    .max(30),
});

export const loginUser = async (
  _currentState: any,
  formData: any,
): Promise<any> => {
  try {
    const redirectTo = formData.get("redirect") || null;
    console.log("redirected from server login:-", redirectTo);
    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validationFields = loginValidationZodSchema.safeParse(loginData);

    if (!validationFields.success) {
      return {
        success: false,
        errors: validationFields.error.issues.map((issue) => {
          return {
            field: issue.path[0],
            message: issue.message,
          };
        }),
      };
    }

    const res = await fetch("http://localhost:4000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    // const cookieStore = await cookies();
    // const rawCookies = response.headers.getSetCookie();
    // const parsedCookies = setCookieParser.parse(rawCookies);

    // for (const cookie of parsedCookies) {
    //   cookieStore.set({
    //     name: cookie.name,
    //     value: cookie.value,
    //     httpOnly: cookie.httpOnly,
    //     secure: cookie.secure,
    //     sameSite: cookie.sameSite as "lax" | "strict" | "none" | undefined,
    //     path: cookie.path,
    //     maxAge: cookie.maxAge,
    //   });
    // }
    // return await response.json();
    const setCookieHeaders = res.headers.getSetCookie();

    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie: string) => {
        const parsedCookie = parse(cookie);

        if (parsedCookie["accessToken"]) {
          accessTokenObject = parsedCookie;
        }
        if (parsedCookie["refreshToken"]) {
          refreshTokenObject = parsedCookie;
        }
      });
    } else {
      throw new Error("No Set-Cookie header found");
    }

    if (!accessTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    if (!refreshTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessTokenObject.accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(accessTokenObject["Max-Age"]) || 1000 * 60 * 60,
      path: accessTokenObject.Path || "/",
      sameSite: accessTokenObject["SameSite"] || "none",
    });

    cookieStore.set("refreshToken", refreshTokenObject.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge:
        parseInt(refreshTokenObject["Max-Age"]) || 1000 * 60 * 60 * 24 * 90,
      path: refreshTokenObject.Path || "/",
      sameSite: refreshTokenObject["SameSite"] || "none",
    });

    const verifiedToken: string | JwtPayload = jwt.verify(
      accessTokenObject.accessToken,
      process.env.JWT_SECRET as Secret,
    );

    if (typeof verifiedToken === "string") {
      throw new Error("Invalid token");
    }

    const userRole: UserRole = verifiedToken.role;

    if(redirectTo) {
      const requestedPath = redirectTo.toString()
      if(isValidRedirectForRole(requestedPath, userRole)){
        redirect(requestedPath)
      } else {
        redirect(getDefaultDashboardRoute(userRole))
      }
    }

    const redirectPath = redirectTo
      ? redirectTo.toString()
      : getDefaultDashboardRoute(userRole);

    redirect(redirectPath);
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    return {
      error: "Login failed",
    };
  }
};
