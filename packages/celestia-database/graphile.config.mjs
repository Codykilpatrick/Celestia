import { PostGraphileAmberPreset } from "postgraphile/presets/amber";
import { makePgService } from "postgraphile/adaptors/pg";


/** @type {GraphileConfig.Preset} */
const preset = {
  extends: [PostGraphileAmberPreset],
  pgServices: [makePgService({ connectionString:"postgresql://celestia" })],
  schemas: ["app"],
  grafserv: { watch: true },
};

export default preset;