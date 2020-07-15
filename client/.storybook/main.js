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
        });
        return config;
    },
};
