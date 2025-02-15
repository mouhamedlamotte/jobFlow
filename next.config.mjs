/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images:{
    dangerouslyAllowSVG: true,
  }
};

export default nextConfig;
