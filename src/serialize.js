import { isObservableProp } from 'mobx';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';

const buildPath = (path, key) => (path ? path.concat(key) : [key]);

export const serialize = (config) => {
  const storeKeysCandidate = [];
  return function process(store, path = []) {
    if (isEmpty(store)) {
      return [];
    }
    for (const key in store) {
      if (store.hasOwnProperty(key)) {
        const storeValue = store[key];

        if (config.ignoreKeys && config.ignoreKeys.includes(key)) {
          continue;
        }

        if (isObservableProp(store, key)) {
          storeKeysCandidate.push(path.concat(key));
        } else if (isObject(storeValue)) {
          process(storeValue, buildPath(path, key));
        }
      }
    }
    return storeKeysCandidate;
  };
};
