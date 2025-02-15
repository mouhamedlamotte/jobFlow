import { TRPCError } from "@trpc/server";

export function handleTRPCError(error: unknown) {
  console.error("TRPC Error:", error);

  if (error instanceof TRPCError) {
    throw error; // Re-throw known tRPC errors
  }

  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: "An unexpected error occurred, please try again later.",
  });
}
