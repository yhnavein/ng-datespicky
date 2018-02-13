const path = require('path');
const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    'datespicky': './index.ts',
    'datespicky.min': './index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'DatesPicky',
    umdNamedDefine: true
  },
  externals: [
    /^angular-?.*$/,
    'lodash',
    'moment'
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: ['node_modules']
  },
  devtool: 'source-map',
  stats: {
    assets: false,
    children: false,
    chunks: true,
    chunkModules: false,
    chunkOrigins: false,
    colors: true,
    modules: false,
    performance: false,
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
      include: /\.min\.js$/,
    }),
    new StyleLintPlugin(),
  ],
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: [
          'ng-annotate-loader',
          {
            loader: 'ts-loader',
            options: {
              silent: true,
              configFileName: 'tsconfig.lib.json'
            }
          },
          'tslint-loader'
        ]
      },
      {
        test: /\.html$/,
        use: [{
            loader: 'html-loader',
            options: {
              exportAsEs6Default: true
            }
          },
          {
            loader: 'htmlhint-loader',
            options: {
              configFile: '.htmlhintrc'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['url-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['url-loader']
      }
    ]
  }
};
