module.exports = {
  entry: './index.jsx',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: [
            'react',
            'es2015',
            'stage-0'
          ]
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}
