/**
 * @type {import('next').NextConfig}
 */

const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
// const withSass = require('@zeit/next-sass');

const env = {};

Object.keys(process.env).forEach((key) => {
    env[key] = process.env[key];
});

// module.exports = withSass({
//     cssModules: true,
//     env,
//     cssLoaderOptions: {
//         url: false,
//     },
// });

const nextConfig = {
    webpack5: true,
    // reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    webpack: (config) => {
        config.resolve.fallback = { fs: false };

        return config;
    },
    images: {
        domains: ['picsum.photos', 'jacopopanzera.com', 'localhost'],
    },
};

module.exports = withPlugins([[withImages]], nextConfig);
