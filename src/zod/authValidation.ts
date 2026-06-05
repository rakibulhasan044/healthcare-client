
import z from "zod";

export const registerPatientValidationZodSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    address: z.string().optional(),
    contactNumber: z.string().min(9, { message: "Contact number is required" }),
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(4, {
        error: "password is required and must be 4 characters long",
      })
      .max(30),
    confirmPassword: z
      .string()
      .min(6, {
        error: "confirm password is required and must be 4 characters long",
      })
      .max(30),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

  export const loginValidationZodSchema = z.object({
  email: z.string({ error: "Invalid email address" }),
  password: z
    .string()
    .min(4, {
      error: "password is required and must be 4 characters long",
    })
    .max(30),
});