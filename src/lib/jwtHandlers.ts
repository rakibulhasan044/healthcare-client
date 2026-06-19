/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from "jsonwebtoken";
export const verifyAccessToken = async (token: string) => {
  try {
    const verifiedAccessToken = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as JwtPayload;

    return {
      success: true,
      message: "token is valid",
      payload: verifiedAccessToken,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Invalid token",
    };
  }
};
