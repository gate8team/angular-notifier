module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        files: [
            { pattern: 'app/tests-context.js', watched: false }
        ],
        frameworks: ['jasmine'],
        preprocessors: {
            'webpack/tests-context.js': ['webpack']
        },
        webpack: {
            module: {
                loaders: [
                    { test: /\.js/, exclude: /node_modules/, loader: 'babel-loader', query: {stage: 0} },
                    { include: /\.json$/, loaders: ["json-loader"] }
                ]
            },
            watch: true
        },
        webpackServer: {
            noInfo: true
        },
        resolve: {
            extensions: ['', '.json', '.jsx', '.js']
        }
    });
};
