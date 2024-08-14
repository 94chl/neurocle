const { whenProd } = require("@craco/craco");
const path = require("path");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      return whenProd(() => {
        const output = {
          ...webpackConfig.output,
          path: path.resolve(__dirname, "build"),
          publicPath: "./",
        };

        return { ...webpackConfig, output };
      }, webpackConfig);
    },
  },
};
