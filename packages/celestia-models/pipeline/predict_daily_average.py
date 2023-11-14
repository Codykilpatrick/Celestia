import joblib
import pandas as pd
import psycopg2
from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv
import os
import logging

load_dotenv()

# Set up logging
logging.basicConfig(level=logging.INFO)


def process_and_insert(connection, type_id, region_id):
    # Load the machine learning model
    model = joblib.load("../models/production_rf_model.joblib")

    cursor = connection.cursor()

    query = "SELECT * FROM celestia_public.market_history_pull WHERE region_id = %s AND type_id = %s;"

    cursor.execute(query, (region_id, type_id))

    rows = cursor.fetchall()

    data = pd.DataFrame(rows, columns=['id', 'date', 'highest', 'lowest', 'average', 'order_count', 'region_id', 'type_id', 'volume'])
    data = data.set_index('date')

    data = data.sort_values(by='date', ascending=True)

    data["tomorrow"] = data["average"].shift(-1)
    data["target"] = (data["tomorrow"] > data["average"]).astype(int)
    data.loc[data["tomorrow"] > data["average"], "movement"] = 1
    data.loc[data["tomorrow"] < data["average"], "movement"] = -1

    data = data.dropna()

    horizons = [2, 7, 14]
    new_predictors = []

    for horizon in horizons:
        rolling_averages = data.rolling(horizon).mean()

        ratio_column = f"close_ratio_{horizon}"
        data[ratio_column] = data['average'].astype(float) / rolling_averages['average']

        trend_column = f"trend_{horizon}"
        data[trend_column] = data.shift(1).rolling(horizon).sum()["movement"]

        new_predictors += [ratio_column, trend_column]

    data = data.dropna()

    X = data[new_predictors]

    y_pred = model.predict(X.iloc[[-1]])

    final_object = {
        "type_id": type_id,
        "region_id": region_id,
        "increase": bool(y_pred[0]),
        "confidence": 100,
        "horizon": 1,
        "date_predicted": X.iloc[[-1]].index.values[0],
    }


    # Insert the final_object into the "model_predict_average_increase" table
    query = """
    INSERT INTO celestia_public.model_predict_average_increase (type_id, region_id, increase, confidence, horizon, date_predicted)
    VALUES (%(type_id)s, %(region_id)s, %(increase)s, %(confidence)s, %(horizon)s, %(date_predicted)s);
    """

    cursor.execute(query, final_object)

    # Commit the transaction and close the database connection
    connection.commit()


def get_active_item_ids(connection, region_id):

    cursor = connection.cursor()

    query = "SELECT * FROM celestia_public.market_history_pull WHERE region_id = %s;"

    cursor.execute(query, (region_id,))

    rows = cursor.fetchall()

    df = pd.DataFrame(rows, columns=['id', 'date', 'highest', 'lowest', 'average', 'order_count', 'region_id', 'type_id', 'volume'])

    # Get the current date and time in UTC
    now_utc = datetime.now(timezone.utc)

    # Get yesterday's date in UTC
    yesterday_utc = now_utc - timedelta(days=2)

    yesterday_utc_date = yesterday_utc.date()
    date_to_filter = yesterday_utc_date.strftime('%Y-%m-%d')

    # Use boolean indexing to filter rows where the 'date' column matches the specified date
    filtered_df = df[df['date'] == date_to_filter]

    # Display the filtered DataFrame
    active_items = list(filtered_df['type_id'])
    return active_items


def main():
    db_host = os.getenv('NEON_HOST')
    db_user = os.getenv('NEON_USER')
    db_password = os.getenv('NEON_PASSWORD')
    db_name = os.getenv('DATABASE')
    db_params = {'host': db_host, 'database': db_name, 'user': db_user, 'password': db_password, }

    connection = psycopg2.connect(**db_params)
    region_ids = [10000043, 10000002, 10000030, 10000032, 10000042]
    # Get the list of active item_ids
    for region_id in region_ids:
        active_item_ids = get_active_item_ids(connection, region_id)
        total_items = len(active_item_ids)
        completed_items = 0

        # Process and insert data for each active item_id
        for type_id in active_item_ids:
            try:
                process_and_insert(connection, type_id, region_id)
                completed_items += 1
                percent_completed = (completed_items / total_items) * 100
                print(f"Processing: {percent_completed:.2f}% completed")
            except Exception as e:
                print(f"Error processing item {type_id}: {e}")
                continue

    # Close connection after everything
    logging.info(f"Predicted on {completed_items} number of items.")
    connection.close()


if __name__ == "__main__":
    main()
