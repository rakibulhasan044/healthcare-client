/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import z from "zod";
import { loginUser } from "./loginUser";

const registerValidationZodSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    // address: z.string().optional(),
    contactNumber: z.string().min(9, { message: "Contact number is required" }),
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(6, {
        error: "password is required and must be 6 characters long",
      })
      .max(30),
    confirmPassword: z
      .string()
      .min(6, {
        error: "confirm password is required and must be 6 characters long",
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
    const validationData = {
      name: formData.get("name"),
      // address: formData.get("address"),
      email: formData.get("email"),
      contactNumber: formData.get("contactNumber"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    console.log({ validationData: validationData });

    const validationFields =
      registerValidationZodSchema.safeParse(validationData);

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

    const registerData = {
      password: formData.get("password"),
      patient: {
        name: formData.get("name"),
        address: formData.get("address"),
        email: formData.get("email"),
        contactNumber: formData.get("contactNumber"),
      },
    };

    console.log({ registerData: registerData });

    const newFormData = new FormData();

    newFormData.append("data", JSON.stringify(registerData));

    const res = await fetch(
      "http://localhost:4000/api/v1/user/create-patient",
      {
        method: "POST",
        body: newFormData,
      },
    );

    const result = await res.json();

    console.log(res, "res");

    if (result.success) {
      await loginUser(_currentState, formData);
    }
    return result;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    return { error: "Registration failed" };
  }
};
