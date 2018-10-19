const config = {
    presets: [
        'node7',
        'react',
    ],
    plugins: [
        'transform-react-constant-elements',
        'transform-react-inline-elements',
    ],
};

try {
    require('babel-register')(config); // eslint-disable-line global-require
} catch (err) {
    console.error('==>     ERROR: Error parsing your .babelrc.');
    console.error(err);
}
