/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidatorSchema } from "@/lib/zodvalidator";
import { IDoctor } from "@/types/doctor.interface";
import {
  createDoctorZodSchema,
  updateDoctorZodSchema,
} from "@/zod/doctor.validation";

export async function createDoctor(_prevSate: any, formData: FormData) {
  const specialtiesString = formData.get("specialties") as string;
  let specialties: string[] = [];
  if (specialtiesString) {
    try {
      specialties = JSON.parse(specialtiesString);
      if (!Array.isArray(specialties)) specialties = [];
    } catch {
      specialties = [];
    }
  }

  const experienceValue = formData.get("experience");
  const appointmentFeeValue = formData.get("appointmentFee");

  const validationPayload: IDoctor = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    contactNumber: formData.get("contactNumber") as string,
    address: formData.get("address") as string,
    registrationNumber: formData.get("registrationNumber") as string,
    experience: Number(formData.get("experience") as string),
    gender: formData.get("gender") as "MALE" | "FEMALE",
    appointmentFee: Number(formData.get("appointmentFee") as string),
    qualification: formData.get("qualification") as string,
    currentWorkingPlace: formData.get("currentWorkingPlace") as string,
    designation: formData.get("designation") as string,
    password: formData.get("password") as string,
    specialties: specialties,
    profilePhoto: formData.get("file") as File,
  };

  const validatedPayload = zodValidatorSchema(
    validationPayload,
    createDoctorZodSchema,
  );

  if (!validatedPayload.success && validatedPayload.errors) {
    return {
      success: validatedPayload.success,
      message: "Validation failed",
      formData: validationPayload,
      errors: validatedPayload.errors,
    };
  }

  if (!validatedPayload.data) {
    return {
      success: validatedPayload.success,
      message: "Validation failed",
      formData: validationPayload,
    };
  }

  const backendPayload = {
    password: validatedPayload.data.password,
    doctor: {
      name: validatedPayload.data.name,
      email: validatedPayload.data.email,
      contactNumber: validatedPayload.data.contactNumber,
      address: validatedPayload.data.address,
      registrationNumber: validatedPayload.data.registrationNumber,
      experience: experienceValue ? Number(experienceValue) : 0,
      gender: validatedPayload.data.gender,
      appointmentFee: appointmentFeeValue ? Number(appointmentFeeValue) : 0,
      qualification: validatedPayload.data.qualification,
      currentWorkingPlace: validatedPayload.data.currentWorkingPlace,
      designation: validatedPayload.data.designation,
      specialties: specialties,
      profilePhoto: formData.get("file") as File,
    },
  };

  const newFormData = new FormData();
  newFormData.append("data", JSON.stringify(backendPayload));
  newFormData.append("file", formData.get("file") as Blob);
  try {
    const response = await serverFetch.post("/user/create-doctor", {
      body: newFormData,
    });

    const result = await response.json();

    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
      formData: validatedPayload.data,
    };
  }
}

export async function getDoctors(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/doctor${queryString ? `?${queryString}` : ""}`,
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

export async function getDoctorById(id: string) {
  try {
    const response = await serverFetch.get(`/doctor/${id}`);
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

export async function updateDoctor(
  id: string,
  _prevState: any,
  formData: FormData,
) {
  const experienceValue = formData.get("experience");
  const appointmentFeeValue = formData.get("appointmentFee");

  const validationPayload: Partial<IDoctor> = {
    name: formData.get("name") as string,
    contactNumber: formData.get("contactNumber") as string,
    address: formData.get("address") as string,
    registrationNumber: formData.get("registrationNumber") as string,
    experience: experienceValue ? Number(experienceValue) : 0,
    gender: formData.get("gender") as "MALE" | "FEMALE",
    appointmentFee: appointmentFeeValue ? Number(appointmentFeeValue) : 0,
    qualification: formData.get("qualification") as string,
    currentWorkingPlace: formData.get("currentWorkingPlace") as string,
    designation: formData.get("designation") as string,
  };

  const specialtiesValue = formData.get("specialties") as string;
  if (specialtiesValue) {
    try {
      const parsed = JSON.parse(specialtiesValue);
      if (Array.isArray(parsed) && parsed.length > 0) {
        validationPayload.specialties = parsed;
      }
    } catch {}
  }

  const removeSpecialtiesValue = formData.get("removeSpecialties") as string;
  if (removeSpecialtiesValue) {
    try {
      const parsed = JSON.parse(removeSpecialtiesValue);
      if (Array.isArray(parsed) && parsed.length > 0) {
        validationPayload.removeSpecialties = parsed;
      }
    } catch {}
  }
  const validatedPayload = zodValidatorSchema(
    validationPayload,
    updateDoctorZodSchema,
  );

  if (!validatedPayload.success && validatedPayload.errors) {
    return {
      success: validatedPayload.success,
      message: "Validation failed",
      errors: validatedPayload.errors,
    };
  }

  if (!validatedPayload.data) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
    };
  }

  console.log(validatedPayload, "validatedPayload");
  console.log(validationPayload, 'validationPayload');

  try {
    const response = await serverFetch.patch(`/doctor/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedPayload.data),
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
      formData: validationPayload,
    };
  }
}

export async function softDeleteDoctor(id: string) {
  try {
    const response = await serverFetch.delete(`/doctor/soft/${id}`);
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
export async function deleteDoctor(id: string) {
  try {
    const response = await serverFetch.delete(`/doctor/${id}`);
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
