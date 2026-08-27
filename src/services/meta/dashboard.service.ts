/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { getUserInfo } from "../auth/getUserInfo";

export async function getDashboardMetaData() {
  try {
    const userInfo = await getUserInfo();
    const cacheTag = `${userInfo.role.toLowerCase()}-dashboard-meta`;

    const response = await serverFetch.get("/meta", {
      cache: "no-store",
    });
    const result = await response.json();
    console.log("[getDashboardMetaData] result:", JSON.stringify(result));
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
    };
  }
}
