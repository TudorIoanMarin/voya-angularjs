const webpack = require('webpack')
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: {
    app: './src/app/app.module.ts',
    style: './src/assets/sass/main.scss',
    vendor: [
      'jquery',
      'angular',
      'angular-ui-router',
      'bootstrap-sass',
      'angular-cache-buster',
      'angular-websocket',
      'rxjs',
      '@angular/core',
      '@angular/common',
      '@angular/compiler',
      '@angular/http',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/platform-server',
      '@angular/router',
      '@angular/upgrade'
    ],
  },
  output: {
    filename: '[name]-bundle.js',
    chunkFilename: '[name]-chunk.js',
    path: path.join(process.cwd() + '/src', "dist"),
  },
            watch: true,
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?limit=1024&name=fonts/[name].[ext]',
      },
      {
         test: /\.scss$/,
         loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader', 'resolve-url-loader'])
      },
    ]
  },
  resolve: {
    modules: [
            path.resolve('./'),
            path.resolve('./node_modules'),
        ],
    extensions: ['.ts', '.tsx', '.js'] // note if using webpack 1 you'd also need a '' in the array as well
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor'),
    new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    tether: 'tether',
    Tether: 'tether',
    'window.Tether': 'tether',
  }),
    new ExtractTextPlugin('[name].css'),
    new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        server: { baseDir: ['src'] }
    }),
    new webpack.ContextReplacementPlugin(
          /angular(\\|\/)core(\\|\/)@angular/
      )
  ]
}
