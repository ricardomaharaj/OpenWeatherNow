const NextPWA = require('next-pwa')

const withPWA = NextPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
}

const config = withPWA(nextConfig)

module.exports = config
