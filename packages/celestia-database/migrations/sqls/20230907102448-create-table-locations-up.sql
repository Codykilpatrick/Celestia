CREATE TABLE celestia_public.location (
  id serial PRIMARY KEY,
  system_name text NOT NULL,
  system_id int NOT NULL,
  region_name TEXT NOT NULL,
  region_id int NOT NULL
);

COMMENT ON TABLE celestia_public.location IS 'A table each location in Eve Online.';
COMMENT ON COLUMN celestia_public.location.system_name IS 'The name for a single solar system.';
COMMENT ON COLUMN celestia_public.location.system_id IS 'The ID for a single solar system.';
COMMENT ON COLUMN celestia_public.location.region_name IS 'The region name that this solar system is in.';
COMMENT ON COLUMN celestia_public.location.region_id IS 'The ID for the region that this solar system is in.';