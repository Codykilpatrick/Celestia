ALTER TABLE celestia_public.market_history_pull
ALTER COLUMN highest TYPE NUMERIC(14, 2);

ALTER TABLE celestia_public.market_history_pull
ALTER COLUMN lowest TYPE NUMERIC(14, 2);

ALTER TABLE celestia_public.market_history_pull
ALTER COLUMN average TYPE NUMERIC(14, 2);

ALTER TABLE celestia_public.market_orders_pull
ALTER COLUMN price TYPE NUMERIC(14, 2);

ALTER TABLE celestia_public.market_orders_pull
ALTER COLUMN volume_remain TYPE NUMERIC(14, 2);

ALTER TABLE celestia_public.market_orders_pull
ALTER COLUMN volume_total TYPE NUMERIC(14, 2);