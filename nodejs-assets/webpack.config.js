const path = require('path')
const webpack = require('webpack')

module.exports = {
  target: 'node',
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'nodejs-project'),
  },
  // plugins: [
  //   new webpack.ContextReplacementPlugin(
  //     // /\/sodium-universal\//,
  //     /(sodium-universal|hypercore-crypto|hypercore)/,
  //     (data) => {
  //       delete data.dependancies[0].critical
  //       return data
  //     }
  //   )
  // ]
}
