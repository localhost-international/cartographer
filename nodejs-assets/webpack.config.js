const path = require('path')
const webpack = require('webpack')

module.exports = {
  target: 'web',
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'nodejs-project'),
  },

  // resolve: {
  //   alias: {
  //     fs: 'graceful-fs',
  //     'sodium-native': '@geut/sodium-javascript-plus',
  //     'sodium-universal': '@geut/sodium-javascript-plus',
  //     hyperswarm: 'hyperswarm-web',
  //     util: './node_modules/util/util.js',
  //   },
  // },

  // plugins: [
  //   new webpack.ContextReplacementPlugin(
  //     // /\/sodium-universal\//,
  //     /(sodium-universal|hyqpercore-crypto|hypercore)/,
  //     (data) => {
  //       delete data.dependancies[0].critical
  //       return data
  //     }
  //   )
  // ]
}
