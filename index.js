require('@babel/register')({
    presets: [
        ["@babel/preset-env", {
            'targets': {
                'node': 'current',
            }
        }],
        "@babel/preset-react",
    ],
    plugins: [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        "@babel/plugin-proposal-class-properties",
        "syntax-trailing-function-commas",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-transform-react-constant-elements",
        "@babel/plugin-transform-react-inline-elements"
    ],
    ignore: [/node_modules\/(?!(apollo-client)\/).*/],
});

require('isomorphic-fetch');

const isomorphicConfig = require('./webpack/webpack-isomorphic-tools');

const DEVELOPMENT = process.env.NODE_ENV !== 'production';

if (DEVELOPMENT) {
    if (!require('piping')({ // eslint-disable-line global-require
        hook: true,
        ignore: /(\/\.|~$|\.json|\.scss|\.log$|client|common)/i,
    })) {
        return;
    }
}

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(isomorphicConfig).server(__dirname, () => {
    const Server = require('./src/server'); // eslint-disable-line global-require
    const server = new Server();
    server.start();
});
