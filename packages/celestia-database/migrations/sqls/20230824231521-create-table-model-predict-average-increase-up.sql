CREATE TABLE celestia_public.model_predict_average_increase (
  id serial PRIMARY KEY,
  type_id int,
  region_id int,
  increase boolean,
  confidence real,
  horizon int,
  date_predicted text
);

COMMENT ON TABLE celestia_public.model_predict_average_increase IS 'A table for the predictions from a random forrest classifier whether a price will increase or decrease.';
COMMENT ON COLUMN celestia_public.model_predict_average_increase.type_id IS 'The type id for the item that is for this data entry.';
COMMENT ON COLUMN celestia_public.model_predict_average_increase.region_id IS 'The region id that is for this data entry.';
COMMENT ON COLUMN celestia_public.model_predict_average_increase.increase IS 'Whether or not the price will increase or decrease based on the horizon.';
COMMENT ON COLUMN celestia_public.model_predict_average_increase.confidence IS 'The percentage of confidence in the models increase prediction.';
COMMENT ON COLUMN celestia_public.model_predict_average_increase.horizon IS 'How many days ahead the model is predicting on.';
COMMENT ON COLUMN celestia_public.model_predict_average_increase.date_predicted IS 'What was the day that the predictions were ran on.'