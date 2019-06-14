import jsan from 'jsan';
import pick from 'lodash/pick';
import { autorun, runInAction } from 'mobx';
import { serialize } from './serialize';
import { parseStore } from './parse-store';
import { filterKeys } from './utils';
import { storageKey, autorunKey, circularKey } from './keys';

class AsyncThunk {
  async _persist() {
    try {
      const persistKeys = serialize(this.config)(this.store);
      const storeToSave = pick(this.store, persistKeys);
      await this.storage.setItem(storageKey, jsan.stringify(storeToSave, null, null, { circular: circularKey }));
    } catch (e) {
      if (this.config.debug) {
        console.warn(e);
      }
    }
  }

  constructor(store, config, storage) {
    this.store = filterKeys(store, config);
    this.config = config;
    this.storage = storage;
  }

  async init() {
    try {
      const data = await this.storage.getItem(storageKey);
      if (data) {
        runInAction(() => {
          parseStore(this.store, jsan.parse(data), false);
        });
      }
    } catch (e) {
      // DO nothing
    }
    // persist before listen change
    this._persist();
    autorun(this._persist.bind(this), {
      name: autorunKey,
    });
  }
}

export default AsyncThunk;
