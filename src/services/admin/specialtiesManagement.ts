/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { serverFetch } from "../../lib/server-fetch";
import { zodValidatorSchema } from "../../lib/zodvalidator";
import { createSpecialtyZodSchema } from "@/zod/specialtiesValidation";

export async function createSpecialty(_prevState: any, formData: FormData) {
  try {
    const payload = {
      title: formData.get("title") as string,
    };

    if (
      zodValidatorSchema(payload, createSpecialtyZodSchema).success === false
    ) {
      return zodValidatorSchema(payload, createSpecialtyZodSchema);
    }
    const validatedPayload = zodValidatorSchema(
      payload,
      createSpecialtyZodSchema,
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
    if (result.success) {
      revalidateTag("specialties-list", "max");
    }
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error?.message : "Something went wrong"}`,
    };
  }
}

export async function getSpecialties() {
  try {
    const response = await serverFetch.get("/specialties", {
      cache: "force-cache",
      next: { tags: ["specialties-list"] },
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error?.message : "Something went wrong"}`,
    };
  }
}

export async function deleteSpecialty(id: string) {
  try {
    const response = await serverFetch.delete(`/specialties/${id}`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log("error->", error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error?.message : "Something went wrong"}`,
    };
  }
}
