const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Add .txt support
config.resolver.assetExts.push("txt");

module.exports = config;
