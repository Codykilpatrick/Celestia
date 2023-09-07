import joblib
import pandas as pd
import psycopg2

model = joblib.load("../models/production_rf_model.joblib")
print("Model loaded")


# This will turn into a query to the postgres DB
data = pd.read_csv('../data/punisher_domain.csv')
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
y = data['target']

y_pred = model.predict(X.iloc[[-1]])

item_name = "Punisher"
item_id = 597
date_predicted = X.iloc[[-1]].index.values[0]
prediction = y_pred[0].astype(bool)

final_object = {
    "type_id": 597,
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

print("Data inserted into PostgreSQL.")