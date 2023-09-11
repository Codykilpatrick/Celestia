# Celestia App

Celestia database package

## Usage

# Local development
create the local database:
`createdb celestia`

To run migrations:
`npx db-migrate up`

To connect to a local database:
`yarn db:connect`

Navigate to the GraphQL database:
`http://[::1]:5678/graphql`

Create migrations with:
`npx db-migrate create`

Execute migrations with:
`npx db-migrate up` & `npx db-migrate down`

# Spin up local database
create the local database:
`createdb celestia`

To run migrations:
`npx db-migrate up`

Seed the database:
`yarn seed-db`