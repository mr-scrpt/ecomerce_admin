import { IUserClerk } from "@/fsd/shared/type/clerkUser.type";

export interface IUser {
  // userId: string | null;
  user: IUserClerk | null;
  error: string | null;
  loading: boolean;
  fetchUserId: () => void;
}
