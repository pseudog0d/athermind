/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    webpack: (config, { isServer }) => {
        // Optimize video handling
        config.module.rules.push({
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
            use: {
                loader: 'file-loader',
                options: {
                    publicPath: '/_next/static/videos/',
                    outputPath: 'static/videos/',
                    name: '[name].[hash].[ext]',
                },
            },
        });

        // Optimize for performance
        if (!isServer) {
            config.optimization = {
                ...config.optimization,
                splitChunks: {
                    chunks: 'all',
                    cacheGroups: {
                        default: false,
                        vendors: false,
                        commons: {
                            name: 'commons',
                            chunks: 'all',
                            minChunks: 2,
                        },
                    },
                },
            };
        }

        return config;
    },
};

export default nextConfig;
