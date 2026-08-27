/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { UserInfo } from "@/types/user.interface";
import { serverFetch } from "@/lib/server-fetch";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "./tokenHandler";

// export const getUserInfo = async (): Promise<UserInfo | null> => {
//   try {
//     const accessToken = await getCookie("accessToken");

//     if (!accessToken) {
//       return null;
//     }

//     const verifiedToken = jwt.verify(
//       accessToken,
//       process.env.JWT_SECRET as string,
//     ) as JwtPayload;

//     if (!verifiedToken) {
//       return null;
//     }

//     const userInfo: UserInfo = {
//       name: verifiedToken.name || "Unknown User",
//       email: verifiedToken.email,
//       role: verifiedToken.role,
//     };

//     return userInfo;
//   } catch (error: any) {
//     console.log(error);
//     return null;
//   }
// };

export const getUserInfo = async (): Promise<UserInfo | any> => {
  let userInfo: UserInfo | any;
  try {
    const response = await serverFetch.get("/auth/me", {
      cache: "force-cache",
      next: { tags: ["user-info"] },
    });

    const result = await response.json();

    if (result.success && result.data) {
      const accessToken = await getCookie("accessToken");

      if (!accessToken) {
        throw new Error("No access token found");
      }

      const verifiedToken = jwt.verify(
        accessToken,
        process.env.JWT_SECRET as string,
      ) as JwtPayload;

      userInfo = {
        name:
          result.data.admin?.name ||
          result.data.doctor?.name ||
          result.data.patient?.name ||
          result.data.name ||
          verifiedToken.name ||
          "Unknown User",
        ...result.data,
        role: verifiedToken.role || result.data.role,
        email: verifiedToken.email || result.data.email,
      };
      return userInfo;
    }
    
    return null;
  } catch (error: any) {
    console.log(error);
    return {
      id: "",
      name: "Unknown User",
      email: "",
      role: "PATIENT",
    };
  }
};
