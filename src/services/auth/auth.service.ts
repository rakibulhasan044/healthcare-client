/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

export async function updateMyProfile(formData: FormData) {
  try {
    const uploadFormData = new FormData();

    const data: any = {};

    // Get all form fields except the file
    formData.forEach((value, key) => {
      if (key !== "file" && value) {
        data[key] = value;
      }
    });

    //ad the data as json
    uploadFormData.append("data", JSON.stringify(data));

    //add the file if it exists

    const file = formData.get("file");
    if (file && file instanceof File && file.size > 0) {
      uploadFormData.append("file", file);
    }

    const response = await serverFetch.patch("/user/update-my-profile", {
      body: uploadFormData,
    });

    const result = await response.json();

    revalidateTag("user-info", { expire: 0 });
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
    };
  }
}
