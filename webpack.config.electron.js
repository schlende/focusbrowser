const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/electron/index.ts',
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
  plugins: [],
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
  output: {
    filename: 'bundle-electron.js',
    path: path.resolve(__dirname, 'dist')
  }
};