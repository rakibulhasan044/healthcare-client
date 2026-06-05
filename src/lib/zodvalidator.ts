import z from "zod";

export const zodValidatorSchema = <T>(payload: T, schema: z.ZodObject) => {
  const validatedPayload = schema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      errors: validatedPayload.error.issues.map((issue) => {
        return {
          field: issue.path[0],
          message: issue.message,
        };
      }),
    };
  }

  return {
    success: true,
    data: validatedPayload.data
  }
};
