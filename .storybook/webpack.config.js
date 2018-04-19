const path = require('path');
const include = path.resolve(__dirname, '../');

module.exports = {
  module: {
      rules: [
          {
              test: /\.tsx?$/,
              use: 'ts-loader',
              exclude: /node_modules/
          },
          {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
          }
      ]
  },
  resolve: {
      extensions: ['.tsx', '.ts', '.js']
  }
};
