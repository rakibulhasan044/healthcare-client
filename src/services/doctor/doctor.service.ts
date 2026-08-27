"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:4000/api/v1";

/**
 * Public fetch — no auth token needed
 */
async function publicFetch(endpoint: string, options: RequestInit = {}) {
  return fetch(`${BACKEND_API_URL}${endpoint}`, {
    ...options,
    cache: "no-store",
  });
}

export async function getTopRatedDoctors(limit = 6) {
  try {
    const response = await publicFetch(
      `/doctor?limit=${limit}&sortBy=averageRating&sortOrder=desc`,
    );
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Error fetching top rated doctors:", error);
    return { success: false, data: [] };
  }
}

export async function getAllDoctorsPublic(queryString?: string) {
  try {
    const response = await publicFetch(
      `/doctor${queryString ? `?${queryString}` : ""}`,
    );
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Error fetching doctors:", error);
    return { success: false, data: [] };
  }
}
