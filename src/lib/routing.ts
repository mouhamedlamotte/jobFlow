export const rootUrl = "/";
export const authRoutes = ["/login", "/signup"];
export const publicRoutes = [
  ...authRoutes,
  "/",
  "/about",
  "/404",
  "/unauthorized",
];

export const appRoutes = [...publicRoutes];
export const defaultRedirect = "/";
