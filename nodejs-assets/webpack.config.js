const path = require('path')

module.exports = {
  target: 'node',
  mode: 'development',
  entry: './nodejs-project/src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'nodejs-project'),
  },
  module: {
    loaders: [
      {
        loader: 'babel'
      }
    ]
  }
}
