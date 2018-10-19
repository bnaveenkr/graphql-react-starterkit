import { graphqlExpress } from 'apollo-server-express';

import schema from './schema';
import config from '../config';

const graphql = graphqlExpress(req => {

    return {
        schema,
        context: {

        },
        formatError: error => ({
            message: error.message,
            state: error.originalError && error.originalError.state,
            locations: error.locations,
            stack: error.stack
        }),
        tracing: config.get('graphql:tracing'),
        cacheControl: config.get('graphql:cacheControl'),
    };
});


export default graphql;
