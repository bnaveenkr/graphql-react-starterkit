const path = require('path');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

const commonModulesPath = path.resolve(__dirname, '../src', 'common');
const nodeModulesPath = path.join(__dirname, '../node_modules');


module.exports = {
    patch_require: true,
    modulesDirectories: [nodeModulesPath, commonModulesPath],
    assets: {
        images: {
            extensions: [
                'jpeg',
                'jpg',
                'png',
                'gif',
            ],
            parser: WebpackIsomorphicToolsPlugin.url_loader_parser,
        },
        fonts: {
            extensions: [
                'woff',
                'woff2',
                'ttf',
                'otf',
                'eot',
            ],
            parser: WebpackIsomorphicToolsPlugin.url_loader_parser,
        },
        svg: {
            extension: 'svg',
            parser: WebpackIsomorphicToolsPlugin.url_loader_parser,
        },
        style_modules: {
            extensions: ['scss', 'css'],
            filter: function (module, regex, options, log) {
                if (options.development) {
                    return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
                }
                return regex.test(module.name);
            },
            path: function (module, options, log) {
                if (options.development) {
                    return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log);
                }
                return module.name;
            },
            parser: function (module, options, log) {
                if (options.development) {
                    return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log);
                }
                return module.source;
            },
        },
    },
};
