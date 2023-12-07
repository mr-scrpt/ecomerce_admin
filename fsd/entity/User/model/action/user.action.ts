"use server";
import { currentUser } from "@clerk/nextjs";

export const getUserId = async (): Promise<string | null> => {
  try {
    const user = await currentUser();
    if (!user) {
      return null;
    }
    return user?.id;
  } catch (e) {
    console.log(" =>>>", e);
    throw new Error("[USER_ACTION: getUserId]");
  }
};
