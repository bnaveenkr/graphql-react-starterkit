import ReactDOM from 'react-dom/server';
import React from 'react';
import ApolloClient from 'apollo-client';
import { StaticRouter } from 'react-router-dom';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';

import logger from 'utils/logger';
import Html from '../Html';
import config from '../config';
import getRoutes from 'routes';
import schema from '../graphql/schema';

function View(req, res, next) {

    if (process.env.NODE_ENV !== 'production') {
        global.webpackIsomorphicTools.refresh();
    }

    const cache = new InMemoryCache();

    const link = new SchemaLink({
        schema,
        context: {},
    });

    const client = new ApolloClient({
        link,
        cache,
        ssrMode: config.get('ssrMode'),
    });

    const component = (
        <ApolloProvider client={client}>
            <StaticRouter location={req.url} context={{}}>
                <div>
                {getRoutes()}
                </div>
            </StaticRouter>
        </ApolloProvider>
    );

    const configForClient =  {
        apiUrl: config.get('api:url'),
        ssrMode: config.get('ssrMode'),
    };

    getDataFromTree(component).then(() => {
        const content = ReactDOM.renderToString(component);
        const htmlComponent = (
            <Html
              content={content}
              state={client.extract()}
              config={configForClient}
              assets={global.webpackIsomorphicTools.assets()}
            />
        );

        const html = `<!doctype html>\n${ReactDOM.renderToStaticMarkup(htmlComponent)}`;
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': Buffer.byteLength(html),
        });
        res.write(html);
        res.end();
    }).catch((err) => {
        logger.error('RENDERING ERROR', err);
        next(err);
    });
}


export default View;
