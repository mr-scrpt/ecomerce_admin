import { User } from "@clerk/nextjs/server";

// export type userClerk = SignedInAuthObject | SignedOutAuthObject;
export interface IUserClerk
  extends Pick<User, "id" | "imageUrl" | "birthday" | "createdAt"> {
  emailAddresses: Array<string>;
}
