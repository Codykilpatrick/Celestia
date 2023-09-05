CREATE TABLE celestia_public.market_orders_pull (
  id serial PRIMARY KEY,
  region_id int NOT NULL,
  is_buy_order boolean NOT NULL,
  issued text,
  location_id int NOT NULL,
  min_volume int,
  order_id int NOT NULL,
  price NUMERIC(12, 2) NOT NULL,
  range text,
  system_id int NOT NULL,
  type_id int NOT NULL,
  volume_remain NUMERIC(12, 2),
  volume_total NUMERIC(12, 2)
);

COMMENT ON TABLE celestia_public.market_orders_pull IS 'A list of current market orders for a given region.';
COMMENT ON COLUMN celestia_public.market_orders_pull.region_id IS 'The region id that this order occured in.';
COMMENT ON COLUMN celestia_public.market_orders_pull.is_buy_order IS 'If this market order is a buy order `true` or a sell order `false`.';
COMMENT ON COLUMN celestia_public.market_orders_pull.issued IS 'The date this order was created.';
COMMENT ON COLUMN celestia_public.market_orders_pull.location_id IS 'The space station id that order occured in.';
COMMENT ON COLUMN celestia_public.market_orders_pull.min_volume IS 'The minimum ammount of items required to satisfy this order.';
COMMENT ON COLUMN celestia_public.market_orders_pull.order_id IS 'The unique id given to this market order for this region and system.';
COMMENT ON COLUMN celestia_public.market_orders_pull.price IS 'The price required to purchase or sell one item in this order.';
COMMENT ON COLUMN celestia_public.market_orders_pull.range IS 'The range that this order is able to be fufiled at, this can either be a a number of systems away, the station, the solar system or the region.';
COMMENT ON COLUMN celestia_public.market_orders_pull.system_id IS 'The solar system id that the order occured in.';
COMMENT ON COLUMN celestia_public.market_orders_pull.type_id IS 'The type id for the item that is for this data entry.';
COMMENT ON COLUMN celestia_public.market_orders_pull.volume_remain IS 'The number of items left available to satisfy this order.';
COMMENT ON COLUMN celestia_public.market_orders_pull.volume_total IS 'The total number of items this order was created with.';