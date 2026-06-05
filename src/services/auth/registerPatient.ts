/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { loginUser } from "./loginUser";
import { serverFetch } from "../../lib/server-fetch";
import { zodValidatorSchema } from "../../lib/zodvalidator";
import { registerPatientValidationZodSchema } from "@/zod/authValidation";

export const registerPatient = async (
  _currentState: any,
  formData: any,
): Promise<any> => {
  try {
    const payload = {
      name: formData.get("name"),
      address: formData.get("address"),
      email: formData.get("email"),
      contactNumber: formData.get("contactNumber"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    if (
      zodValidatorSchema(payload, registerPatientValidationZodSchema)
        .success === false
    ) {
      return zodValidatorSchema(payload, registerPatientValidationZodSchema);
    }
    const validatedPayload: any = zodValidatorSchema(
      payload,
      registerPatientValidationZodSchema,
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
