import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isIOS() {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
}

/**
 * Extracts the domain name from the BASE_URL environment variable.
 * Falls back to 'localhost:3000' if not in production or if BASE_URL is invalid.
 *
 * @returns {string} The extracted domain name.
 */
export function getDomain() {
  if (process.env.NODE_ENV === "production") {
    if (!process.env.BASE_URL) {
      console.warn(
        "BASE_URL is not defined in production. Falling back to an empty string."
      );
      return "";
    }

    try {
      const url = new URL(process.env.BASE_URL);
      return url.hostname;
    } catch (error) {
      console.error("Invalid BASE_URL provided:", process.env.BASE_URL);
      return "";
    }
  } else {
    // Development environment fallback
    return "localhost:3000";
  }
}

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export const isProduction = process.env.NODE_ENV === "production";
