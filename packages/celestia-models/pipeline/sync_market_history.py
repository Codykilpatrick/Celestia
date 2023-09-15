import psycopg2
import pandas as pd


def sync_table(connection, region_id):
    cursor = connection.cursor()
    query = f"SELECT * FROM celestia_public.market_history_sync WHERE region_id = {region_id};"
    cursor.execute(query)
    new_results = cursor.fetchall()
    data = pd.DataFrame(new_results, columns=['id', 'date', 'highest', 'lowest', 'average', 'order_count', 'region_id', 'type_id', 'volume'])
    print(data)


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
