const webpack = require('webpack');
const path = require('path');
const sassLintPlugin = require('sasslint-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'src/client/public');
const APP_DIR = path.resolve(__dirname, 'src/client/app');

const config = {
  entry: `${APP_DIR}/index.jsx`,
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader'
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                path.resolve(APP_DIR, 'styles/sass'),
              ],
              sourceMap: true

            }
          }
        ]

      },
      {
        test: /\.svg$/,
        loader: 'svg-react-loader'
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new sassLintPlugin({
      configFile: '.sass-lint.yml',
      glob: 'src/**/*.s?(a|c)ss',
    }),
  ]
};

module.exports = config;
