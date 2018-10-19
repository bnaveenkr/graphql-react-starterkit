import ReactDOM from 'react-dom/server';
import React from 'react';
import ApolloClient from 'apollo-client';
import { StaticRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';

import Html from '../Html';
import getRoutes from 'routes';
import schema from '../graphql/schema';

function reformatError(error, req, res, next) {
    try{
        errorHandler(error);
    } catch (e){
        next(e);
    }
}
function errorView(err, req, res, next) {

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
        ssrMode: true,
    });

    const component = (
        <ApolloProvider client={client}>
            <StaticRouter location={req.url} context={{}}>
                <div>
                {getRoutes(null, err)}
                </div>
            </StaticRouter>
        </ApolloProvider>
    );


    const content = ReactDOM.renderToString(component);
    const htmlComponent = (
        <Html
          content={content}
          state={client.extract()}
          config={{}}
          assets={global.webpackIsomorphicTools.assets()}
          errors={err}
        />
    );

    const html = `<!doctype html>\n${ReactDOM.renderToStaticMarkup(htmlComponent)}`;
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': Buffer.byteLength(html),
    });
    res.write(html);
    res.end();
}


export default [reformatError, errorView];
