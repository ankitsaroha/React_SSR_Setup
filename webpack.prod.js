const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

const clientWebpack = {
  mode: 'production',
  target: 'web',
  entry: './src/ClientSide.jsx',
  output: {
    filename: 'js/clientbundle.js',
    path: path.resolve(__dirname, 'public')
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
  resolve: {
    extensions: ['.js', '.jsx']
  }
};

const serverWebpack = {
  mode: 'production',
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
