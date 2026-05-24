/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const registerPatient = async (
  _currentState: any,
  formData: any,
): Promise<{
  success: boolean;
  errors?: { field: string; message: string }[];
  message?: string;
}> => {
  try {
    console.log(formData.get("address"));

    const registerData = {
      password: formData.get("password"),
      patient: {
        name: formData.get("name"),
        address: formData.get("address"),
        email: formData.get("email"),
        contactNumber: formData.get("contactNumber")
      },
    };

    console.log(formData);

    const newFormData = new FormData();

    newFormData.append("data", JSON.stringify(registerData));

    const res = await fetch(
      "http://localhost:4000/api/v1/user/create-patient",
      {
        method: "POST",
        body: newFormData,
      },
    );

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      return {
        success: false,
        message: errorBody?.message ?? "Registration failed. Please try again.",
      };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Registration error:", error?.message);
    return {
      success: false,
      message: "Could not reach the server. Please try again later.",
    };
  }
};
