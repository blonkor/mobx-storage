/* eslint-disable no-param-reassign */
import { isObservableArray, isObservableMap, observable } from 'mobx';
import isObject from 'lodash/isObject';
import { circularKey } from './keys';

export const parseStore = (store, data) => {
  // if store or data is empty, break it
  if (!store || !data) {
    return;
  }
  // use data to iterate for avoid store does not set default value, and then
  // the properties will not exist actually. so, the observable
  // map/array/object field must has a default value, when the object is
  // constructed.
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const storeValue = store[key];
      const dataValue = data[key];

      // skip circular dependencies
      if (dataValue === circularKey) {
        continue;
      }
      if (isObservableArray(storeValue)) {
        store[key] = observable.array(dataValue);
      } else if (isObservableMap(storeValue)) {
        store[key] = observable.map(dataValue);
      } else if (!isObject(dataValue)) {
        store[key] = dataValue;
      } else if (!storeValue) {
        store[key] = dataValue;
      } else {
        parseStore(storeValue, dataValue);
      }
    }
  }
};
