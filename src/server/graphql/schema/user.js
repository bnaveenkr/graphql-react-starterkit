import {
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType,
} from 'graphql';

import casual from 'casual';

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'A user ',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'Id of user',
            resolve: user => casual.uuid
        },

        firstName: {
            type: GraphQLString,
            description: 'First name of user',
            resolve: user => casual.first_name,
        },

        lastName: {
            type: GraphQLString,
            description: 'Last name of user',
            resolve: user => casual.last_name,
        },


        email: {
            type: GraphQLString,
            description: 'Email Id of user',
            resolve: user => casual.email,
        },
    }),
});


export default UserType;
