/* eslint-disable @typescript-eslint/no-explicit-any */

import z from "zod";
import { serverFetch } from "../auth/server-fetch";
import { zodValidatorSchema } from "../../lib/zodvalidator";

const createSpecialityZodSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
});

export async function createSpeciality(_prevState: any, formData: FormData) {
  try {
    const payload = {
      title: formData.get("title") as string,
    };

    if(zodValidatorSchema(payload, createSpecialityZodSchema).success === false) {
      return zodValidatorSchema(payload, createSpecialityZodSchema);
    }
    const validatedPayload = zodValidatorSchema(payload, createSpecialityZodSchema).data;

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
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error?.message : "Something went wrong"}`,
    };
  }
}
function zodValidator(
  payload: { title: string },
  createSpecialityZodSchema: z.ZodObject<{ title: z.ZodString }, z.core.$strip>,
) {
  throw new Error("Function not implemented.");
}
