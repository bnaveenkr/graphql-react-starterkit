import DataLoader from 'dataloader';
import elasticsearch from 'elasticsearch';
import logger from 'utils/logger';
import config from '../../config';

class ESConnector {
    constructor() {
        this.loader = new DataLoader(this.fetch.bind(this));
        this.esClient = new elasticsearch.Client(config.get('elasticStore'));

        this.index = config.get('elasticStore:index');
    }

    fetch(queries) {
        return Promise.all(queries.map(query => {
            return new Promise((resolve, reject) => {
                const esKey = JSON.parse(query);
                const { type, body } = esKey;

                logger.debug('Fetching from ES');
                this.esClient.search({
                    type,
                    body,
                    index: this.index,
                }).then(response => {
                    logger.debug(`Fetched ${query}`);
                    resolve({totalHits: response.hits.total, results: response.hits.hits});
                }).catch(err => {
                    logger.error(`Failed to fetch ${query}`);
                    err.message = `Failed to fetch ${query} (${err.message})`;
                    reject(err);
                });
            });
        }));
    }

    get(query) {
        return this.loader.load(query);
    }
}

export default ESConnector;
