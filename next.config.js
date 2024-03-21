/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: "build",
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === "development" ? '' : process.env.NEXT_PUBLIC_BASE_URL,
  redirects: async() => {
      return [
          {
              source: '*',
              destination: "https://mbx-staging.getmagicbox.com/edu-ai-skills/",
              permanent: true
          }
    ]
  }
//   async rewrites() {
//     console.log("Rewrites called");
//     return {
//       fallback: [
//         {
//           source: '/:path*',
//           destination: `https://mbx-staging.getmagicbox.com/edu-ai-skills/`,
//         },
//       ],
//     }
//   },
};

module.exports = nextConfig