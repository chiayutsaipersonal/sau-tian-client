'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require(path.resolve(path.join(__dirname, '../config')))
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const htmlWebpackTemplate = require('html-webpack-template')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  // used only when using HMR with express webpack-hot-middleware
  // can be dynamically added by the express server at run time to
  // the config before starting webpack compiler
  // entry: { app: ['webpack-hot-middleware/client?reload=true'] },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,
  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: { poll: config.dev.poll, }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require(path.resolve(path.join(__dirname, '../config/dev.env')))
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: htmlWebpackTemplate,
      inject: false,
      favicon: path.resolve(path.join(__dirname, '../static/favicon.ico')),
      appMountId: 'app',
      title: config.appTitle,
      lang: 'zh',
      mobile: {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      links: ['https://use.fontawesome.com/releases/v5.0.2/css/all.css'],
      minify: {
        removeComments: false,
        collapseWhitespace: true,
        removeAttributeQuotes: false,
        preserveLineBreaks: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
