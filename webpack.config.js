const path = require('path')
const WebpackUserscript = require('webpack-userscript')
const dev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: dev ? 'development' : 'production',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'EventHelperV2.user.js',
    publicPath: '/',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
      publicPath: '',
    },
    host: '127.0.0.1',
    allowedHosts: 'all'
  },
  plugins: [
    new WebpackUserscript({
      headers: {
        name: 'EventHelperV2',
        description: 'sources: https://github.com/achepta/hwm-event-helper',
        author: 'achepta',
        namespace: 'https://greasyfork.org/ru/scripts/399402-eventhelper',
        downloadURL: 'https://hwm.events/scripts/code/EventHelper.user.js',
        updateURL: 'https://hwm.events/scripts/code/EventHelper.user.js',
        connect: ["hwm.events", "localhost"],
        match: [
            "https://www.heroeswm.ru/*",
            "https://my.lordswm.com/*",
            "https://www.lordswm.com/*",
        ],
        license: 'GNU GPLv3',
        "run-at": 'document-end',
        version: dev ? `[version]-build.[buildNo]` : `[version]`
      }
    })
  ],
  module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
},
  optimization: {
    minimize: true
  }
}
