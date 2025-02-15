import { auth } from "@/server/auth";
import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    // Log to console.
    console.error("Action error:", e.message);
    return e.message;
  },
}).use(async ({ next, clientInput, metadata }) => {
  // Logging middleware
  // You can add more logging here if you want to.
  const startTime = performance.now();

  // Here we await the action execution.
  const result = await next();

  const endTime = performance.now();

  console.log("Result: ", result);
  console.log("Client input: ", clientInput);
  console.log("Metadata: ", metadata);
  console.log("Action execution took ", endTime - startTime, "ms");

  // And then return the result of the awaited action.
  return result;
});

// Authenticated action client
export const authActionClient = actionClient.use(async ({ next }) => {
  const session = await auth();

  if (!session) {
    throw new Error("Session not found!");
  }

  const userId = session.user.id;

  if (!userId) {
    throw new Error("Session is not valid!");
  }

  // Return the next middleware with `userId` value in the context
  return next({ ctx: { session } });
});
