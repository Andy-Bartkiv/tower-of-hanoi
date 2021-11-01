const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    // test: './src/test.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Tower of Hanoi',
      favicon: "./img/favicon.png",
      chunks : ['index']
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'test.html',
    //   title: 'testing TOH',
    //   chunks : ['test']
    // })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};