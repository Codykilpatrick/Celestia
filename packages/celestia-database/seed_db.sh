#!/bin/bash

# Define your PostgreSQL connection parameters
DB_USER="postgres"
DB_PASSWORD="password"
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="celestia"

# Define the path to your CSV file
ITEM_TABLE="./seed_data/item_ids.csv"

# Run the PostgreSQL command to seed the database
psql "postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}" <<EOF
\COPY celestia_public.item (type_id, item_name) FROM '${ITEM_TABLE}' DELIMITER ',' CSV HEADER;
EOF

# Define the relative path to your second CSV file
LOCATION_TABLE="./seed_data/location_ids.csv"

# Run the PostgreSQL command to seed the database with the second CSV file
psql "postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}" <<EOF
\COPY celestia_public.location (region_id, system_id, system_name, region_name) FROM '${LOCATION_TABLE}' DELIMITER ',' CSV HEADER;
EOF