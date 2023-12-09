"use server";
import { currentUser } from "@clerk/nextjs";
import { HTTPStatusEnum } from "../../type/httpStatus.enum";
import { ResponseDataAction } from "../../type/response.type";
import { AuthResponseErrorEnum } from "../../type/responseError.enum";
import { IUserClerk } from "../../type/clerkUser.type";

export const getUser = async (): Promise<ResponseDataAction<IUserClerk>> => {
  const user = await currentUser();
  if (!user) {
    console.log(" =>>> error");
    return {
      data: null,
      error: AuthResponseErrorEnum.USER_NOT_FOUND,
      status: HTTPStatusEnum.NOT_FOUND,
    };
  }
  const data = {
    id: user.id,
    imageUrl: user.imageUrl,
    birthday: user.birthday,
    createdAt: user.createdAt,
    emailAddresses: user.emailAddresses.map((item) => item.emailAddress),
  };
  console.log(" =>>> more user data", data);

  return {
    data,
    error: null,
    status: HTTPStatusEnum.OK,
  };
};