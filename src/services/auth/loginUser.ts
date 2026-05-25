/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import z from "zod";
import setCookieParser from "set-cookie-parser";

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

    // const res = await fetch("http://localhost:4000/api/v1/auth/login", {
    //   method: "POST",
    //   body: JSON.stringify(loginData),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    // // .then((res) => res.json());

    // // return res;
    // const result = await res.json();

    // const cookieStore = await cookies();

    // cookieStore.set("accessToken", result.data.accessToken, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "lax",
    // });

    // cookieStore.set("refreshToken", result.data.refreshToken, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "lax",
    // });

    // return {
    //   success: result.success,
    //   message: result.message,
    //   data: {
    //     needPasswordChange: result.data.needPasswordChange,
    //   },
    // };
    const response = await fetch("http://localhost:4000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    const cookieStore = await cookies();

    const rawCookies = response.headers.getSetCookie();

    const parsedCookies = setCookieParser.parse(rawCookies);

    for (const cookie of parsedCookies) {
      cookieStore.set({
        name: cookie.name,
        value: cookie.value,
        httpOnly: cookie.httpOnly,
        secure: cookie.secure,
        sameSite: cookie.sameSite as "lax" | "strict" | "none" | undefined,
        path: cookie.path,
        maxAge: cookie.maxAge,
      });
    }

    return await response.json();
  } catch (error) {
    console.log(error);
    return {
      error: "Login failed",
    };
  }
};
