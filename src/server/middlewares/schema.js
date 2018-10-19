import { graphql } from 'graphql';
import { introspectionQuery } from 'graphql/utilities';

import schema from '../graphql/schema';


export default function (req, res) {
    graphql(schema, introspectionQuery).then(result => {
        res.status(200).send(result);
    });
}
