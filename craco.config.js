const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "jsconfig",
        jsConfigPath: "jsconfig.paths.json",
      },
    },
  ],
  // style: {
  //   sass: {
  //     loaderOptions: {
  //       additionalData: `
  //         @import "src/styles/variables.scss";
  //       `,
  //     },
  //   },
  // },
};
