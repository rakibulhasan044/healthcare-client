/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidatorSchema } from "@/lib/zodvalidator";
import {
  changePasswordSchema,
  resetPasswordSchema,
} from "@/zod/authValidation";
import { revalidateTag } from "next/cache";
import { deleteCookie, getCookie, setCookie } from "./tokenHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  getDefaultDashboardRoute,
  isValidRedirectForRole,
  UserRole,
} from "@/lib/auth-utils";
import { getUserInfo } from "./getUserInfo";
import { redirect } from "next/navigation";
import { verifyAccessToken } from "@/lib/jwtHandlers";
import { parse } from "cookie";

export async function updateMyProfile(formData: FormData) {
  try {
    const uploadFormData = new FormData();

    const data: any = {};

    // Get all form fields except the file
    formData.forEach((value, key) => {
      if (key !== "file" && value) {
        data[key] = value;
      }
    });

    //ad the data as json
    uploadFormData.append("data", JSON.stringify(data));

    //add the file if it exists

    const file = formData.get("file");
    if (file && file instanceof File && file.size > 0) {
      uploadFormData.append("file", file);
    }

    const response = await serverFetch.patch("/user/update-my-profile", {
      body: uploadFormData,
    });

    const result = await response.json();

    revalidateTag("user-info", { expire: 0 });
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
    };
  }
}

export async function resetPassword(_prevState: any, formData: FormData) {
  const redirectTo = formData.get("redirect") || null;

  // Build validation payload
  const validationPayload = {
    newPassword: formData.get("newPassword") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  // Validate
  const validatedPayload = zodValidatorSchema(
    validationPayload,
    resetPasswordSchema,
  );

  if (!validatedPayload.success && validatedPayload.errors) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
      errors: validatedPayload.errors,
    };
  }

  try {
    const accessToken = await getCookie("accessToken");

    if (!accessToken) {
      throw new Error("User not authenticated");
    }

    const verifiedToken = jwt.verify(
      accessToken as string,
      process.env.JWT_SECRET!,
    ) as JwtPayload;

    const userRole: UserRole = verifiedToken.role;

    const user = await getUserInfo();
    // API Call
    const response = await serverFetch.post("/auth/reset-password", {
      body: JSON.stringify({
        id: user?.id,
        password: validationPayload.newPassword,
      }),
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Reset password failed");
    }

    if (result.success) {
      // await get
      revalidateTag("user-info", { expire: 0 });
    }

    if (redirectTo) {
      const requestedPath = redirectTo.toString();
      if (isValidRedirectForRole(requestedPath, userRole)) {
        redirect(`${requestedPath}?loggedIn=true`);
      } else {
        redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
      }
    } else {
      redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
    }
  } catch (error: any) {
    // Re-throw NEXT_REDIRECT errors so Next.js can handle them
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    return {
      success: false,
      message: error?.message || "Something went wrong",
      formData: validationPayload,
    };
  }
}

export async function getNewAccessToken() {
  try {
    const accessToken = await getCookie("accessToken");
    const refreshToken = await getCookie("refreshToken");

    //Case 1: Both tokens are missing - user is logged out
    if (!accessToken && !refreshToken) {
      return {
        tokenRefreshed: false,
      };
    }

    // Case 2 : Access Token exist- and need to verify
    if (accessToken) {
      const verifiedToken = await verifyAccessToken(accessToken);

      if (verifiedToken.success) {
        return {
          tokenRefreshed: false,
        };
      }
    }

    //Case 3 : refresh Token is missing- user is logged out
    if (!refreshToken) {
      return {
        tokenRefreshed: false,
      };
    }

    //Case 4: Access Token is invalid/expired- try to get a new one using refresh token
    // This is the only case we need to call the API

    // Now we know: accessToken is invalid/missing AND refreshToken exists
    // Safe to call the API
    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;

    // API Call - serverFetch will skip getNewAccessToken for /auth/refresh-token endpoint
    const response = await serverFetch.post("/auth/refresh-token", {
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
    });

    const result = await response.json();

    console.log("access token refreshed!!", result);

    const setCookieHeaders = response.headers.getSetCookie();

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

    await deleteCookie("accessToken");
    await setCookie("accessToken", accessTokenObject.accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(accessTokenObject["Max-Age"]) || 1000 * 60 * 60,
      path: accessTokenObject.Path || "/",
      sameSite: accessTokenObject["SameSite"] || "none",
    });

    await deleteCookie("refreshToken");
    await setCookie("refreshToken", refreshTokenObject.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge:
        parseInt(refreshTokenObject["Max-Age"]) || 1000 * 60 * 60 * 24 * 90,
      path: refreshTokenObject.Path || "/",
      sameSite: refreshTokenObject["SameSite"] || "none",
    });

    if (!result.success) {
      throw new Error(result.message || "Token refresh failed");
    }

    console.log(accessToken, refreshToken);
    return {
      tokenRefreshed: true,
      success: true,
      message: "Token refreshed successfully",
    };
  } catch (error: any) {
    console.log("error from last err");
    return {
      tokenRefreshed: false,
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
}

export async function changePassword(_prevState: any, formData: FormData) {
  const validationPayload = {
    oldPassword: formData.get("oldPassword") as string,
    newPassword: formData.get("newPassword") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const validatedPayload = zodValidatorSchema(
    validationPayload,
    changePasswordSchema,
  );

  if (!validatedPayload.success && validatedPayload.errors) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
      errors: validatedPayload.errors,
    };
  }

  try {
    const response = await serverFetch.post("/auth/change-password", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldPassword: validationPayload.oldPassword,
        newPassword: validationPayload.newPassword,
      }),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Password change failed");
    }

    console.log(result);
    return {
      success: true,
      message: result.message || "Password changed successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong!",
      formData: validationPayload,
    };
  }
}
