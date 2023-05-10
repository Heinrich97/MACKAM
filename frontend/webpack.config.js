const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
 entry: {
   index: './src/index.js',
 },
 plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
  ],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(gif|png|jpg|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      },
    ],
  },
};
