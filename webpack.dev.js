const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const clientWebpack = {
  mode: 'development',
  target: 'web',
  entry: './src/ClientSide.jsx',
  output: {
    filename: 'js/clientbundle.js',
    path: path.resolve(__dirname, 'public')
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            'react',
            'stage-0'
          ]
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: {
                safe: true
              },
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              autoprefixer: {
                browsers: ['last 2 versions']
              },
              plugins: () => [
                autoprefixer
              ],
              sourceMap: true
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};

const serverWebpack = {
  mode: 'development',
  target: 'node',
  entry: './server/index.js',
  output: {
    filename: 'serverbundle.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            'react',
            'stage-0'
          ]
        }
      }
    ]
  },
  externals: [webpackNodeExternals()],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};

module.exports = [clientWebpack, serverWebpack];
