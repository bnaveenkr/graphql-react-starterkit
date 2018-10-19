import {
    GraphQLSchema,
    GraphQLObjectType,
} from 'graphql';

import UserType from './user';

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'The root query',
    fields: () => ({
        user: {
            type: UserType,
            description: 'Get the current user',
            resolve: (root) => root,
        },
    }),
});

const schema = new GraphQLSchema({
    query: QueryType,
});

export default schema;
