import psycopg2
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone


load_dotenv()

# Get the current date and time in UTC
now_utc = datetime.now(timezone.utc)

# Get yesterday's date in UTC

purge_day = now_utc - timedelta(days=2)
purge_day = purge_day.strftime("%Y-%m-%d")

# Connect to the PostgreSQL database
db_host = os.getenv('NEON_HOST')
db_user = os.getenv('NEON_USER')
db_password = os.getenv('NEON_PASSWORD')
db_name = os.getenv('DATABASE')
db_params = {'host': db_host, 'database': db_name, 'user': db_user, 'password': db_password, }
print(db_params)

conn = psycopg2.connect(**db_params)
# Create a cursor object
cur = conn.cursor()

print(purge_day)

# Write the DELETE query
delete_query = "DELETE FROM celestia_public.model_predict_average_increase WHERE date_predicted != %s;"

# Execute the DELETE query
cur.execute(delete_query, (purge_day,))

# Get the number of rows deleted
rows_deleted = cur.rowcount
print(f"{rows_deleted} rows deleted.")

# Commit the changes
conn.commit()

# Close the cursor and connection
cur.close()
conn.close()
