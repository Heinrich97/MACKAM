const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
 entry: {
   index: './src/index.js',
 },
 plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
  ],
  output: {
   filename: 'index.bundle.js',
   publicPath: '/'
  },
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