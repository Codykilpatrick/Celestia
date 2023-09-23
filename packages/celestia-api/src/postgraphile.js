const { postgraphile } = require('postgraphile')

const { DATABASE, PG_USER, PASSWORD, HOST, PG_PORT } = process.env

module.exports = postgraphile(
    {
        database: DATABASE,
        user: PG_USER,
        password: PASSWORD,
        host: HOST,
        port: PG_PORT,
    },
    'celestia_public',
    {
        watchPg: true,
        graphiql: true,
        enhanceGraphiql: true,
        subscriptions: true,
        dynamicJson: true,
        exportGqlSchemaPath: `${__dirname}/schema.graphql`,
    },
)