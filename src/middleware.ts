import { authConfig } from "@/server/auth";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import {  defaultRedirect, publicRoutes } from "./lib/routing";

const { auth } = NextAuth(authConfig);

// Helper function to check if a route is public
const isPublicRoute = (pathname: string): boolean => {
  return publicRoutes.some((route) => {
    // Handle exact matches
    if (!route.includes("*")) {
      return pathname === route;
    }
    // Handle wildcard patterns (e.g. '/auth/*')
    if (route.endsWith("*")) {
      // Removes the wildcard character and the trailing slash from the route
      const baseRoute = route.slice(0, -2);
      return pathname.startsWith(baseRoute);
    }
    return false;
  });
};

// Helper function to check if a route is an authentication route


export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;

  // // Redirect authenticated users away from login and signup pages
  if (isAuthenticated && nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL(defaultRedirect, nextUrl));
  }

  // Redirect unauthenticated users to the login page for private routes
  if (!isAuthenticated && !isPublicRoute(nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  // Continue to the requested page if no conditions were met
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Match all paths except:
    // - api routes (/api/*)
    // - static files (_next/static/*, _next/image/*, favicon.ico)
    // - public directory files (/public/*)
    // - files in public directory (/uploads/*, /assets/*)
    "/((?!api|_next/static|_next/image|favicon.ico|public|uploads|assets).*)",
  ],
};
