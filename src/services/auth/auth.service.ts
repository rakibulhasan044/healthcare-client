/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidatorSchema } from "@/lib/zodvalidator";
import { resetPasswordSchema } from "@/zod/authValidation";
import { revalidateTag } from "next/cache";
import { getCookie } from "./tokenHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  getDefaultDashboardRoute,
  isValidRedirectForRole,
  UserRole,
} from "@/lib/auth-utils";
import { getUserInfo } from "./getUserInfo";
import { redirect } from "next/navigation";

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

  //build validation payload
  const validationPayload = {
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  };

  //validate
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
