const webpack = require('webpack');
const path = require('path');
const SassLintPlugin = require('sasslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'build');
const SRC_DIR = path.resolve(__dirname, 'src');
const APP_DIR = path.resolve(SRC_DIR, 'app');

const envFiles = {
  local: '../.env',
  staging: '../.env.staging',
  production: '../.env.production'
};

const config = {
  entry: `${APP_DIR}/index.jsx`,
  output: {
    path: BUILD_DIR,
    filename: '[name].js'
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
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['url-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  node: {
    fs: 'empty'
  },
  devtool: 'source-map',
  plugins: [
    new SassLintPlugin({
      configFile: '.sass-lint.yml',
      glob: 'src/**/*.s?(a|c)ss',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      sourceMap: true
    }),
    new Dotenv({
      path: path.resolve(__dirname, envFiles[process.env.ENVIRONMENT] || '../.env')
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
    port: 8080,
    proxy: {
      '/api': { target: 'http://localhost:8081' }
    }
  }
};

module.exports = config;
