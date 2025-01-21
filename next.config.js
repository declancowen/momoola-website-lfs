const nextConfig = {
    images: {
        unoptimized: true,
        domains: ["localhost"]
    },
    env: {
        EMAIL_OCTOPUS_API_KEY: process.env.EMAIL_OCTOPUS_API_KEY,
        EMAIL_OCTOPUS_LIST_ID: process.env.EMAIL_OCTOPUS_LIST_ID
    },
    swcMinify: true,
    experimental: {
        forceSwcTransforms: true
    }
}

module.exports = nextConfig
