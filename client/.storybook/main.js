const path = require('path');

module.exports = {
  stories: ['../src/components/**/*.stories.js'],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', {
        loader: 'sass-loader',
        options: {
          includePaths: [
            path.resolve(__dirname, '../src/app/styles/sass'),
          ],
          sourceMap: true
        }
      }],
      include: path.resolve(__dirname, '../'),
    })

    config.module.rules = config.module.rules.map(data => {
      if (/svg\|/.test(String(data.test)))
        data.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/;
      return data;
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: require.resolve('babel-loader') },
      { loader: require.resolve('react-svg-loader') }]
    });

    return config;
  },
};
