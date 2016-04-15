var path = require('path');
var webpack = require('webpack');
var ignore = new webpack.IgnorePlugin(/\.svg$/);
var nodeModulesDir = path.resolve(__dirname, 'node_modules');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('/js/common.js');
var envFlagPlugin = new webpack.DefinePlugin({  
  __ENV__: JSON.stringify(process.env.NODE_ENV || 'dev')
});

module.exports = {
    entry: {
        main: [ 'webpack-dev-server/client?http://localhost:8080',
                'webpack/hot/only-dev-server',
                './scripts/main.js'
              ]
    },
    output: {
        publicPath: 'http://localhost:8080/',
        filename: '/js/[name].js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loaders: ['react-hot','babel?presets[]=es2015&presets[]=react'], exclude: [nodeModulesDir]},
            { test: /\.(scss|css)$/, loader: ExtractTextPlugin.extract('styless', 'css!autoprefixer!sass') }
        ]
    },
    plugins: [
        ignore,
        new ExtractTextPlugin('./server/public/css/main.css'),
        commonsPlugin,
        envFlagPlugin
    ]
};