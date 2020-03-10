var webpack = require('webpack');

module.exports = {
    
    entry: [
        './src/index.js',
        'webpack-dev-server/clients?http://0.0.0.0:4000',
        'webpack/hot/only-dev-server'
    ],

    output: {
        path: '/',
        filename: 'bundle.js'
    },

    devServer: {
        hot: true,
        filename: 'bundle.js',
        publicPath: '/',
        historyApiFallback: true,
        contentBase:'./public/',
        proxy: {
            "**" : "http://localhost:3000"
        },
        stats: {
            assets: false,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false
        }
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'bable',
                exclude: /node_modules/,
                query: {
                    cacheDirecotry: true,
                    presets: ['es2015', 'react'],
                    plugins: ["react-hotloader/babel"]
                }
            }
        ]
    },

    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // NoErrosPlugin은 deprecated되었음.
        new webpack.NoEmitOnErrorsPlugin()
    ]
};
