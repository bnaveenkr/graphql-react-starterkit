import url from 'url';
import Express from 'express';

import config from './config';
import logger from 'utils/logger';
import setupMiddlewares from './middlewares';

class Server {
    start() {
        const app = Express();

        setupMiddlewares(app);

        app.listen(config.get('server:port'), () => logger.info(
          `Server is now running on ${url.format(config.get('server'))}`
        ));
    }
}

export default Server;
