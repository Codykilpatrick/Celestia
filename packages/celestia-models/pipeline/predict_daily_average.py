import joblib
import pandas as pd
import psycopg2


def process_and_insert_csv(csv_filename, item_id):
    # Load the machine learning model
    model = joblib.load("../models/production_rf_model.joblib")
    print("Model loaded")

    # This will turn into a query to the postgres DB
    data = pd.read_csv(csv_filename)
    data = data.set_index('date')

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
        data[ratio_column] = data['average'] / rolling_averages['average']

        trend_column = f"trend_{horizon}"
        data[trend_column] = data.shift(1).rolling(horizon).sum()["movement"]

        new_predictors += [ratio_column, trend_column]

    data = data.dropna()

    X = data[new_predictors]

    y_pred = model.predict(X.iloc[[-1]])

    final_object = {
        "type_id": item_id,
        "region_id": 10000043,
        "increase": bool(y_pred[0]),
        "confidence": 100,
        "horizon": 1,
        "date_predicted": X.iloc[[-1]].index.values[0],
    }

    conn = psycopg2.connect(
        dbname="celestia",
        user="postgres",
        password="password",
        host="localhost",
        port="5432"
    )

    cur = conn.cursor()

    # Insert the final_object into the "model_predict_average_increase" table
    query = """
    INSERT INTO celestia_public.model_predict_average_increase (type_id, region_id, increase, confidence, horizon, date_predicted)
    VALUES (%(type_id)s, %(region_id)s, %(increase)s, %(confidence)s, %(horizon)s, %(date_predicted)s);
    """

    cur.execute(query, final_object)

    # Commit the transaction and close the database connection
    conn.commit()
    conn.close()

    print(f"Data from '{csv_filename}' inserted into PostgreSQL.")


# Process and insert data from 'punisher_domain.csv'
process_and_insert_csv('../data/punisher_domain.csv', 597)

# Process and insert data from 'large_skill_injector.csv'
process_and_insert_csv('../data/large_skill_injector_domain.csv', 40520)
