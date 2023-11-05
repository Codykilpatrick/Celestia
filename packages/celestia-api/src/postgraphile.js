const { postgraphile } = require('postgraphile')

const { DATABASE, NEON_USER, NEON_PASSWORD, NEON_HOST, NEON_PORT } = process.env

module.exports = postgraphile(
    {
        database: DATABASE,
        user: NEON_USER,
        password: NEON_PASSWORD,
        host: NEON_HOST,
        port: NEON_PORT,
        ssl: require,
    },
    'celestia_public',
    {
        watchPg: false,
        graphiql: true,
        enhanceGraphiql: true,
        subscriptions: true,
        dynamicJson: true,
        exportGqlSchemaPath: `${__dirname}/schema.graphql`,
        retryOnInitFail: false
    },
)