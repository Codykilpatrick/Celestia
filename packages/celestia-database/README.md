# Celestia Database

Celestia database package. Responsible for managing migrations and testing locally before mirroring in cloud environment.

## Usage

Ceate the local database:
`createdb celestia`

To run migrations:
`npx db-migrate up`

Seed the database with static files:
`yarn seed-db`

Populate the database with most recent cloud dump:
`yarn db:sync`

Create migrations with:
`npx db-migrate create`

Execute migrations with:
`npx db-migrate up` & `npx db-migrate down`
