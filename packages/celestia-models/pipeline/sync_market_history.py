import psycopg2
import pandas as pd


def sync_table(connection, region_id):
    cursor = connection.cursor()
    query = f"SELECT * FROM celestia_public.market_history_sync WHERE region_id = {region_id};"
    cursor.execute(query)
    new_results = cursor.fetchall()
    new_data = pd.DataFrame(new_results, columns=['id', 'date', 'highest', 'lowest', 'average', 'order_count', 'region_id', 'type_id', 'volume'])
    query_dates = f"SELECT * FROM celestia_public.market_history_pull WHERE region_id = {region_id};"
    cursor.execute(query_dates)
    dates_in_current = cursor.fetchall()
    dates = pd.DataFrame(dates_in_current, columns=['id', 'date', 'highest', 'lowest', 'average', 'order_count', 'region_id', 'type_id', 'volume'])
    unique_dates = dates['date'].unique()
    new_data_trimmed = new_data[~new_data['date'].isin(unique_dates)]
    
    # Append new_data_trimmed to the PostgreSQL table
    insert_query = """
        INSERT INTO celestia_public.market_history_pull
        (date, highest, lowest, average, order_count, region_id, type_id, volume)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
    """
    values = [tuple(row) for row in new_data_trimmed[['date', 'highest', 'lowest', 'average', 'order_count', 'region_id', 'type_id', 'volume']].values]
    
    try:
        cursor.executemany(insert_query, values)
        connection.commit()
        print(f"{len(new_data_trimmed)} rows appended to market_history_pull for region_id {region_id}")
    except psycopg2.Error as e:
        connection.rollback()
        print(f"Error inserting data: {e}")



def main():
    db_params = { 'host': 'localhost', 'database': 'celestia', 'user': 'postgres', 'password': 'password', }

    connection = psycopg2.connect(**db_params)
    region_ids = [10000043, 10000002, 10000030, 10000032, 10000042]
    # Get the list of active item_ids
    for region_id in region_ids:
        print("Processing:", region_id)
        sync_table(connection, region_id)

    connection.close()


if __name__ == "__main__":
    main()
