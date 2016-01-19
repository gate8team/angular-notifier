var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname + '/app/assets/dev',
    entry: './js/notifier.application.js',
    output: {
        path: __dirname + '/app/assets/dist/js/',
        filename: 'notifier.bundle.js'
    },
    module: {
        loaders: [
            {test: /\.js$/,     loader: 'babel', exclude: /node_modules/, query: {stage: 0}},
            {test: /\.html$/,   loader: 'raw',   exclude: /node_modules/},
            {test: /\.css$/,    loader: ExtractTextPlugin.extract('style!css'), exclude: /node_modules/},
            {test: /\.less$/,   loader: ExtractTextPlugin.extract('css!less'),  exclude: /node_modules/},
            {test: /\.eot$/,    loader: "file-loader"},
            {test: /\.woff2?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
            {test: /\.ttf$/,    loader: "url-loader?limit=10000&mimetype=application/octet-stream"},
            {test: /\.svg$/,    loader: "url-loader?limit=10000&mimetype=image/svg+xml"},
            { test: /\.coffee$/, loader: "coffee-loader" },
            { test: /\.(coffee\.md|litcoffee)$/, loader: "coffee-loader?literate" },
            { include: /\.json$/, loaders: ["json-loader"] }
        ]
    },
    plugins: [],
    resolve: {
        extensions: ['', '.json', '.jsx', '.js']
    }
};
