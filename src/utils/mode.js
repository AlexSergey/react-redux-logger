const MODE = {
    development: 'development',
    test: 'test',
    production: 'production',
};

export default MODE[process.env.NODE_ENV];