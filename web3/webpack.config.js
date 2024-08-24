// const path = require('path');

// module.exports = function override(config) {
//   config.resolve.fallback = {
//     "path": false,
//     "os": require.resolve("os-browserify/browser")
//   };
//   return config;
// };


// module.exports = {
//   // other configurations...
//   resolve: {
//     fallback: {
//       os: require.resolve('os-browserify/browser'),
//       "path": false,
//     }
//   }
// };

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        os: require.resolve('os-browserify/browser'),
        path: require.resolve('path-browserify'),
      };
      return webpackConfig;
    },
  },
};