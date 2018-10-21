require('babel-register')({
    presets: [
        ['env', {
            'targets': {
                'node': 'current',
            }
        }],
        'react',
    ],
    plugins: [
        'transform-decorators-legacy',
        'transform-react-constant-elements',
        'transform-react-inline-elements',
        'transform-class-properties',
        'syntax-trailing-function-commas',
        'transform-object-rest-spread',
    ],
    ignore: /node_modules\/(?!(apollo-client)\/).*/,
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
    const Server = require('./src/server').default; // eslint-disable-line global-require
    const server = new Server();
    server.start();
});
