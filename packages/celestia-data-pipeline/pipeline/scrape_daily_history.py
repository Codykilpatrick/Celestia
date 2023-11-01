import requests
import bz2
import csv
import psycopg2
import logging
import datetime

# Get yesterday's date
yesterday = datetime.date.today() - datetime.timedelta(days=1)

# Format the date as a string in the format 'YYYY-MM-DD'
date_string = yesterday.strftime('%Y-%m-%d')

# URL of the .bz2 file
url = f"https://data.everef.net/market-history/2023/market-history-{date_string}.csv.bz2"


# Download the .bz2 file
response = requests.get(url)

# Decompress the .bz2 file
data = bz2.decompress(response.content)

# Convert the decompressed data to a list of dictionaries
reader = csv.DictReader(data.decode('utf-8').splitlines())

# Connect to the PostgreSQL database
conn = psycopg2.connect(database="celestia", user="postgres", password="password", host="127.0.0.1", port="5432")

# Set up logging
logging.basicConfig(level=logging.INFO)

# Create a cursor object
cur = conn.cursor()

# Iterate over the rows in the data
data = [(row['date'], row['highest'], row['lowest'], row['average'], row['order_count'], row['region_id'], row['type_id'], row['volume']) for row in reader]

try:
    # Bulk insert the data into the database
    cur.executemany("""INSERT INTO celestia_public.market_history_pull (date, highest, lowest, average, order_count, region_id, type_id, volume)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)""", data)
    
    # Log status
    logging.info(f"Inserted {len(data)} rows")

except Exception as e:
    logging.error(f"Failed to insert rows: {e}")

# Commit the changes and close the connection
try:
    conn.commit()
    conn.close()
    logging.info("Committed changes and closed connection")
except Exception as e:
    logging.error(f"Failed to commit changes and close connection: {e}")