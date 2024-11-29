const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    // Add .ts and .tsx extensions to the resolver
    sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json'],
    // You can also add additional extensions here, e.g. for custom files
  },
  transformer: {
    // You can customize the transformer here if necessary
  },
  // Add custom watchFolders if necessary, e.g., if you're using local dependencies or monorepos
  // watchFolders: [
  //   path.resolve(__dirname, '../some-local-package'),
  // ],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
