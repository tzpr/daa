
const config = {};

config.mongoURI = function mongo(environment) {
    if (environment === 'development') {
        return process.env.MONGO_URI_DEV;
    }
    if (environment === 'test') {
        return process.env.MONGO_URI_DEV;
    }
    if (environment === 'prod') {
        return process.env.MONGO_URI_PROD;
    }
};

config.server = {
    host: '0.0.0.0',
    port: 3000
};

module.exports = config;
