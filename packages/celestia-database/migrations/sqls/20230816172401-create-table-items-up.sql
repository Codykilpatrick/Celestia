CREATE TABLE celestia_public.item (
  id serial PRIMARY KEY,
  item_name text NOT NULL,
  type_id int NOT NULL
);