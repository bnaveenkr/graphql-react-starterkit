import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter } from 'react-router-dom';

import getRoutes from 'routes';

require('media/favicon.png');

const config = window.__CONFIG__; // eslint-disable-line no-undef, no-underscore-dangle

const cache = new InMemoryCache().restore(window.__APOLLO_STATE__); // eslint-disable-line no-undef, no-underscore-dangle

window.__APOLLO_STATE__ = null;
window.__CONFIG__ = null;

const httpLink = new HttpLink({
    uri: config.apiUrl,
    credentials: 'include',
});

const client = new ApolloClient({
    link: httpLink,
    cache,
    ssrMode: config.ssrMode,
});

ReactDOM.hydrate(
    <ApolloProvider client={client}>
         <BrowserRouter>
             <div>
                 {getRoutes()}
             </div>
         </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('app')
);
