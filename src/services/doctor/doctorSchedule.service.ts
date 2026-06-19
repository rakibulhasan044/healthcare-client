/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

export async function getDoctorOwnSchedules(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/doctor-schedule/my-schedule${queryString ? `?${queryString}` : ""}`,
    );

    const result = await response.json();

    return {
      success: result.success,
      data: Array.isArray(result.data) ? result.dat : [],
      meta: result.meta,
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      data: [],
      message: `${process.env.NODE_ENV === "development" ? error.message : "something went wrong"}`,
    };
  }
}

export async function getAvailableSchedules() {
  try {
    const response = await serverFetch.get("schedule");
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      data: [],
      message: `${process.env.NODE_ENV === "development" ? error.message : "something went wrong"}`,
    };
  }
}

export async function createDoctorSchedule(scheduleIds: string[]) {
  try {
    const response = await serverFetch.post("/doctor-schedule", {
      body: JSON.stringify({ scheduleIds }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      data: [],
      message: `${process.env.NODE_ENV === "development" ? error.message : "something went wrong"}`,
    };
  }
}

export async function deleteDoctorOwnSchedules(scheduleId: string[]) {
  try {
    const response = await serverFetch.delete(`/doctor-schedule/${scheduleId}`);

    const result = await response.json();
    return {
        success: result.success,
        message: result.message || "Schedule removed successfully"
    }
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      data: [],
      message: `${process.env.NODE_ENV === "development" ? error.message : "something went wrong"}`,
    };
  }
}
