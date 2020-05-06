const path = require('path');

module.exports = {
    stories: ['../src/components/**/*.stories.js'],
    webpackFinal: async (config) => {
        config.module.rules.push({
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../'),
        });

        return config;
    },
};
