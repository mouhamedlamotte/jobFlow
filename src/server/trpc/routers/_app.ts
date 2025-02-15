import { router } from "../trpc";

export const appRouter = router({
  exampleRouter: router({
    // Add your tRPC functions here
  }),
  // Add other routers here
});

// Export type definition of API
export type AppRouter = typeof appRouter;
