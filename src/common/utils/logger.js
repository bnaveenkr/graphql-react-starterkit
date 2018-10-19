import winston from 'winston';

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            level: 'debug',
        }),
        new (winston.transports.File)({
            name: 'debug-file',
            filename: 'starterkit-debug.log',
            level: 'debug',
        }),
        new (winston.transports.File)({
            name: 'error-file',
            filename: 'starterkit-error.log',
            level: 'error',
        }),
    ],
});

export default logger;
