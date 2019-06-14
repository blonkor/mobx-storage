import pick from 'lodash/pick';
import omit from 'lodash/omit';

export const filterKeys = (store, config) => {
  if (config.whiteList) {
    return pick(store, config.whiteList);
  }
  if (config.blackList) {
    return omit(store, config.blackList);
  }
  return store;
};
