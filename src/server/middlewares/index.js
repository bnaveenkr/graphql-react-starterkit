import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import { graphiqlExpress } from 'apollo-server-express';

import status from './status';
import view from './view';
import errors from './error';
import staticFiles from './static';
import schema from './schema';
import graphqlMiddleware from '../graphql';
import config from '../config';


const setupMiddlewares = (app) => {

    const graphqlIsDev = config.get('graphql:mode') === 'dev';

    app.use(helmet());
    app.disable('x-powered-by');
    app.set('trust proxy', 1);

    // compress responses
    app.use(compression());
    app.get('/status', status);

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());


    app.get('/schema', schema);

    app.post('/graphql', graphqlMiddleware);

    if (graphqlIsDev) {
        app.get('/graphiql', graphiqlExpress({
            endpointURL: '/graphql',
        }));

        app.get('/schema', schema);
    }

    app.use('/static', staticFiles());

    app.get('/*', view);

    app.use(...errors);
};

export default setupMiddlewares;
