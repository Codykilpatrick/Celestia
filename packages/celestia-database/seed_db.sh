#!/bin/bash

# Define your PostgreSQL connection parameters
DB_USER="postgres"
DB_PASSWORD="password"
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="celestia"

# Define the path to your CSV file
CSV_FILE="./seed_data/item_ids.csv"

# Run the PostgreSQL command to seed the database
psql "postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}" <<EOF
\COPY celestia_public.item (type_id, item_name) FROM '${CSV_FILE}' DELIMITER ',' CSV HEADER;
EOF
