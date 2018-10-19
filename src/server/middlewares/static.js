import url from 'url';
import path from 'path';
import express from 'express';

import config from '../config';


function staticFiles() {
    if (process.env.NODE_ENV === 'production') {
        return express.static(path.join(process.cwd(), 'dist'), config.get('cache:static'));
    } else {
        // Otherwise we want to proxy the webpack development server.
        const server = url.format('http://localhost:3000');
        return express.static(server);
    }
}

export default staticFiles;
