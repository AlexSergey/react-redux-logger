const MODE = {
    development: 'development',
    test: 'test',
    production: 'production'
};

let isLogging = process.env.LOGGING_ACTIVATION === 'LOGGING_ACTIVATION';

let isDebug = process.env.DEBUG_MODE === 'DEBUG_MODE';

export default MODE[process.env.NODE_ENV];

export { isLogging, isDebug };
