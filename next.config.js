/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    REPLICATE_API_TOKEN: "18cbd34dfb33a8cfe9fd5c18fae60f9ff3207456"
},
  images: {
    domains: ["replicate.delivery","allbuddas.vercel.app","paypal.com"],

    
  },
};

module.exports = nextConfig;
