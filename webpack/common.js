const { join } = require('path');

module.exports = {
    entry: join(__dirname, '../src/index'),
    output: {
        filename: 'meleven.js',
        libraryTarget: 'umd',
        library: 'meleven',
        path: join(__dirname, '../lib')
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }
};
