const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = () => {
  return {
    mode: 'development',
    entry: {
      index: './webpack-index.ts',
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
          options: {
            sources: false,
          },
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: { configFile: 'tsconfig.json' },
        },
        {
          test: /\.(json)$/,
          type: 'asset/source',
        },
        {
          test: /\.(jpe?g|png|gif|svg|webp|ico|xml)$/,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        template: './index.html',
        inject: true,
        chunks: ['index'],
        filename: 'index.html',
      }),
    ],
    output: {
      filename: '[name].bundle.js',
      assetModuleFilename: '[path]/[name][ext]',
      chunkFilename: '[id].[chunkhash].js',
      path: path.resolve(__dirname, 'dist/'),
      publicPath: 'auto',
      clean: true,
    },
  };
};

module.exports = config;
