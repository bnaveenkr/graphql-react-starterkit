require.extensions['.scss'] = function () {
    return;
};

require.extensions['.css'] = function () {
    return;
};

require.extensions['.png'] = function () {
    return;
};

require.extensions['.svg'] = function () {
    return;
};

require('@babel/register');

const chai = require('chai');
const { JSDOM } = require('jsdom');
const sinonChai = require('sinon-chai');
const chaiImmutable = require('chai-immutable');
const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

const exposedProperties = ['window', 'navigator', 'document'];

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;
global.window = window;
global.document = window.document;

Object.keys(global.document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = global.document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js',
};

global.documentRef = document;

enzyme.configure({ adapter: new Adapter() });
chai.use(sinonChai);
chai.use(chaiImmutable);
