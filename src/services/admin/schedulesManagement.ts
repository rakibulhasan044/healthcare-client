/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidatorSchema } from "@/lib/zodvalidator";
import { createScheduleZodSchema } from "@/zod/schedule.validation";

/**
 * CREATE SCHEDULE
 * API: POST /schedule
 */
export async function createSchedule(_prevState: any, formData: FormData) {
  // Build validation payload
  const validationPayload = {
    startDate: formData.get("startDate") as string,
    endDate: formData.get("endDate") as string,
    startTime: formData.get("startTime") as string,
    endTime: formData.get("endTime") as string,
  };

  const validation = zodValidatorSchema(
    validationPayload,
    createScheduleZodSchema,
  );

  if (!validation.success && validation.errors) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
      errors: validation.errors,
    };
  }

  if (!validation.data) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
    };
  }

  try {
    const response = await serverFetch.post("/schedule", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validation.data),
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Create schedule error:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to create schedule",
      formData: validationPayload,
    };
  }
}

/**
 * GET ALL SCHEDULES
 * API: GET /schedule?queryParams
 */
export async function getSchedules(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/schedule${queryString ? `?${queryString}` : ""}`,
    );
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
    };
  }
}

/**
 * GET SCHEDULE BY ID
 * API: GET /schedule/:id
 */
export async function getScheduleById(id: string) {
  try {
    const response = await serverFetch.get(`/schedule/${id}`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
    };
  }
}

/**
 * DELETE SCHEDULE
 * API: DELETE /schedule/:id
 */
export async function deleteSchedule(id: string) {
  try {
    const response = await serverFetch.delete(`/schedule/${id}`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
    };
  }
}
