const CracoAlias = require("craco-alias");
const { whenProd } = require("@craco/craco");
const path = require("path");

module.exports = (arg) => {
  const { env } = arg;
  const isDev = env === "development";
  return {
    webpack: {
      configure: (webpackConfig) => {
        return whenProd(() => {
          const output = {
            ...webpackConfig.output,
            path: path.resolve(__dirname, "dist"),
            publicPath: isDev ? "/" : "./",
            clean: true,
          };

          return { ...webpackConfig, output };
        }, webpackConfig);
      },
    },
    plugins: [
      {
        plugin: CracoAlias,
        options: {
          source: "jsconfig",
          jsConfigPath: "jsconfig.paths.json",
        },
      },
    ],
  };
};
