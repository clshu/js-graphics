const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const wasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

module.exports = (env, args) => {
  const isProduction = args.mode === 'production';

  return {
    entry: './index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contenthash].js' : '[name].[hash].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
      new wasmPackPlugin({
        TextDecoder: ['tex-encoding', 'TextDecoder'],
        TextEncoder: ['tex-encoding', 'TextEncoder'],
    ],
  };
};
