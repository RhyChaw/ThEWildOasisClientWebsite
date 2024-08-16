/*import { NextResponse } from "next/server";

export function middleware(request) {
  console.log(request);

  return NextResponse.redirect(new URL("/about", request.url));
}*/

// import { authOptions } from "@/app/_lib/auth";
// export const middleware = authOptions;

// export const config = {
//   matcher: ["/account"],
// };

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  // Get the session token from the request
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // If the token is not present, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the token exists, allow the request to continue
  return NextResponse.next();
}

// Define routes that require authentication
export const config = {
  matcher: ["/account"], // Only apply middleware to this route
};

