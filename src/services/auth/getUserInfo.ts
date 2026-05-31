/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { UserInfo } from "@/types/user.interface";
import { getCookie } from "./tokenHandler";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const accessToken = await getCookie("accessToken");
    if (!accessToken) {
      return null;
    }

    const token =
      typeof accessToken === "string" ? accessToken : accessToken.value;
    if (!token) {
      return null;
    }

    const verifiedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    if (!verifiedToken) {
      return null;
    }

    const userInfo: UserInfo = {
      name: verifiedToken.name,
      email: verifiedToken.email,
      role: verifiedToken.role,
    };

    return userInfo;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};
