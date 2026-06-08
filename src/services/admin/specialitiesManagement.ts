/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import z from "zod";
import { serverFetch } from "../../lib/server-fetch";
import { zodValidatorSchema } from "../../lib/zodvalidator";
import { createSpecialityZodSchema } from "@/zod/specialitiesValidation";

export async function createSpeciality(_prevState: any, formData: FormData) {
  try {
    const payload = {
      title: formData.get("title") as string,
    };

    if (
      zodValidatorSchema(payload, createSpecialityZodSchema).success === false
    ) {
      return zodValidatorSchema(payload, createSpecialityZodSchema);
    }
    const validatedPayload = zodValidatorSchema(
      payload,
      createSpecialityZodSchema,
    ).data;

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(validatedPayload));

    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }

    const response = await serverFetch.post("/specialties", {
      body: newFormData,
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error?.message : "Something went wrong"}`,
    };
  }
}

export async function getSpeciality() {
  try {
    const response = await serverFetch.get("/specialties");
    const result = await response.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error?.message : "Something went wrong"}`,
    };
  }
}

export async function deleteSpeciality(id: string) {
  try {
    const response = await serverFetch.delete(`/specialties/${id}`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log("error-->>",error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error?.message : "Something went wrong"}`,
    };
  }
}
