/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'localhost',
            port: '3000',
            pathname: '/public/**',
          },
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/dchmrl6fc/**',
          },
          {
            protocol: 'https',
            hostname: 'i.ibb.co',
            port: '',
            pathname: '/mB4S7K2/**',
          },
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            port: '',
            pathname: '/a/**',
          },
        ],
      },
};

export default nextConfig;
