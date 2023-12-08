import { SignedInAuthObject, SignedOutAuthObject } from "@clerk/nextjs/server";

export type userClerk = SignedInAuthObject | SignedOutAuthObject;
