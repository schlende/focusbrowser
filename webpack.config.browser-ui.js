const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/browser-ui/index.tsx',
  mode: 'development',
  target: 'electron-renderer',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './static/index.html'}),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
  devServer: {
    port: 3001 // Specify a port number to listen for requests
  }
};