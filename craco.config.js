const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
    configure: (webpackConfig) => {
      const sassLoader = webpackConfig.module.rules.find(
        ({ test }) => test && test.toString().includes("scss")
      );

      const { options } = sassLoader?.use?.find(
        ({ loader }) => loader === "sass-loader"
      ) ?? {};

      if (options) {
        options.sassOptions = {
          includePaths: [path.resolve(__dirname, "src/styles")],
        };
      }

      return webpackConfig;
    },
  },
};
