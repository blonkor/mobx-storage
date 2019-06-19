import {DEFAULT_VERSION} from "./constant";

export const createMigrations = (version, data, config) => {
  let nextStore = data;
  let migrateVersion =
    config.migrations && config.version !== undefined
      ? config.version
      : DEFAULT_VERSION;

  if (version === migrateVersion) {
    if (config.debug) {
      console.warn("versions match, noop migration");
    }
  }

  if (version > migrateVersion) {
    if (config.debug) {
      console.error("downgrading version is not supported");
    }
  }

  if (version < migrateVersion) {
    for (let key = version; key <= migrateVersion; key++) {
      nextStore = config.migrations[key](nextStore);
    }
  }
  return nextStore;
};