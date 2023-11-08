const { postgraphile } = require('postgraphile')

const { DATABASE, NEON_USER, NEON_PASSWORD, NEON_HOST, NEON_PORT, NODE_ENV } = process.env

let databaseConfig;


if (NODE_ENV === 'development') {
    databaseConfig = {
        database: 'celestia',
        user: 'postgres',
        password: 'password',
        host: '127.0.0.1',
        port: '5432',
    };
} else if (NODE_ENV === 'production') {
    databaseConfig = {
        database: DATABASE,
        user: NEON_USER,
        password: NEON_PASSWORD,
        host: NEON_HOST,
        port: NEON_PORT,
        ssl: require,
    };
}


module.exports = postgraphile(
    databaseConfig,
    'celestia_public',
    {
        watchPg: false,
        graphiql: true,
        enhanceGraphiql: true,
        subscriptions: true,
        dynamicJson: true,
        exportGqlSchemaPath: `${__dirname}/schema.graphql`,
        retryOnInitFail: false
    }
);