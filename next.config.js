module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer)
      config.module.rules.push({
        test: /\.worker\.(js|ts)$/i,
        use: [
          {
            loader: "comlink-loader",
            options: {
              singleton: true,
              name: "static/[hash].worker.js",
              publicPath: "/_next/",
            },
          },
        ],
      })

    return config
  },
}
