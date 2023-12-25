import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

import { NextResponse, type NextRequest } from "next/server";

export default authMiddleware({
  publicRoutes: ["/api/:path*"],
  beforeAuth: (req) => {
    NextResponse.next({
      request: {
        headers: new Headers({ "x-url": req.url }),
      },
    });
  },
});

//
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
