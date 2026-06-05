/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import z from "zod";
import { loginUser } from "./loginUser";
import { serverFetch } from "./server-fetch";
import { zodValidatorSchema } from "../../lib/zodvalidator";

const registerValidationZodSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    // address: z.string().optional(),
    contactNumber: z.string().min(9, { message: "Contact number is required" }),
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(4, {
        error: "password is required and must be 4 characters long",
      })
      .max(30),
    confirmPassword: z
      .string()
      .min(6, {
        error: "confirm password is required and must be 4 characters long",
      })
      .max(30),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export const registerPatient = async (
  _currentState: any,
  formData: any,
): Promise<any> => {
  try {
    const payload = {
      name: formData.get("name"),
      // address: formData.get("address"),
      email: formData.get("email"),
      contactNumber: formData.get("contactNumber"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    if (
      zodValidatorSchema(payload, registerValidationZodSchema).success === false
    ) {
      return zodValidatorSchema(payload, registerValidationZodSchema);
    }
    const validatedPayload: any = zodValidatorSchema(
      payload,
      registerValidationZodSchema,
    ).data;

    const registerData = {
      password: validatedPayload.password,
      patient: {
        name: validatedPayload.name,
        address: validatedPayload.address,
        email: validatedPayload.email,
        contactNumber: validatedPayload.contactNumber,
      },
    };

    const newFormData = new FormData();

    newFormData.append("data", JSON.stringify(registerData));

    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }

    const res = await serverFetch.post("/user/create-patient", {
      body: newFormData,
    });

    const result = await res.json();

    console.log(res, "res");

    if (result.success) {
      return await loginUser(_currentState, formData);
    }
    return result;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error?.message : "Registration failed. Please try again"}`,
    };
  }
};
