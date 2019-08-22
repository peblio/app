// const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');

const ENVIRONMENT = process.env.ENVIRONMENT || 'local';

const { ifNotTest } = getIfUtils(ENVIRONMENT);

const BUILD_DIR = path.resolve(__dirname, 'build');
const SRC_DIR = path.resolve(__dirname, 'src');
const APP_DIR = path.resolve(SRC_DIR, 'app');

const envFiles = {
  local: '.env',
  test: '.env',
  staging: '.env.staging',
  production: '.env.production'
};

const config = {
  entry: ['babel-polyfill', `${APP_DIR}/index.jsx`],
  output: {
    path: BUILD_DIR,
    publicPath: '/',
    filename: '[name].js'
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  module: {
    rules: removeEmpty([
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader'
      },
      ifNotTest({
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true
        }
      }),
      {
        test: /\.(scss|css)$/,
        use: [
          { loader: 'style-loader',
            options: {
              sourceMap: false
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                path.resolve(APP_DIR, 'styles/sass'),
              ],
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-react-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['url-loader']
      }
    ])
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  node: {
    fs: 'empty'
  },
  devtool: 'source-map',
  plugins: [
    // new SassLintPlugin({
    //   configFile: '.sass-lint.yml',
    //   glob: 'src/**/*.s?(a|c)ss',
    // }),
    new Dotenv({
      path: path.resolve(__dirname, envFiles[ENVIRONMENT] || '.env')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(SRC_DIR, 'index.html'),
      favicon: path.resolve(APP_DIR, 'images/favicon.ico')
    }),
    new CopyWebpackPlugin([
      { from: path.resolve(SRC_DIR, 'static') }
    ], { copyUnmodified: true })
  ],
  devServer: {
    historyApiFallback: true,
    port: process.env.CLIENT_PORT || 8080,
    proxy: {
      '/api': { target: `http://localhost:${process.env.SERVER_PORT || 8081}` }
    }
  }
};

module.exports = config;
