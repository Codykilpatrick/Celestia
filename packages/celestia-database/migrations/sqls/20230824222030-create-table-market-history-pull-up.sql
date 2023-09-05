CREATE TABLE celestia_public.market_history_pull (
  id serial PRIMARY KEY,
  date text NOT NULL,
  highest NUMERIC(12, 2) NOT NULL,
  lowest NUMERIC(12, 2) NOT NULL,
  average NUMERIC(12, 2) NOT NULL,
  order_count int,
  region_id int,
  type_id int,
  volume bigint
);

COMMENT ON TABLE celestia_public.market_history_pull IS 'A list of historical market statistics for a given region.';
COMMENT ON COLUMN celestia_public.market_history_pull.date IS 'The date of this historical statistic entry';
COMMENT ON COLUMN celestia_public.market_history_pull.highest IS 'The highest an item sold for on this date in this region.';
COMMENT ON COLUMN celestia_public.market_history_pull.lowest IS 'The lowest an item sold for on this date in this region.';
COMMENT ON COLUMN celestia_public.market_history_pull.average IS 'The average price an item sold for on this date in this region.';
COMMENT ON COLUMN celestia_public.market_history_pull.order_count IS 'The ammount of individual orders for this item in a specific region.';
COMMENT ON COLUMN celestia_public.market_history_pull.volume IS 'The ammount of individual items across all orders for this item in a specific region.';
COMMENT ON COLUMN celestia_public.market_history_pull.region_id IS 'The region id that is for this data entry.';
COMMENT ON COLUMN celestia_public.market_history_pull.type_id IS 'The type id for the item that is for this data entry.'
