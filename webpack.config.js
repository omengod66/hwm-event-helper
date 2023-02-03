const path = require('path')
const WebpackUserscript = require('webpack-userscript')
const dev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: dev ? 'development' : 'production',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'EventHelper.user.js',
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
        name: 'EventHelper',
        description: 'try to take over the world!',
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
        grant: ['unsafeWindow', 'GM.xmlHttpRequest', 'GM.xmlhttpRequest', 'GM_xmlHttpRequest', 'GM_xmlhttpRequest'],
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
    minimize: false
  }
}
