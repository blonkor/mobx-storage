import pick from 'lodash/pick';
import omit from 'lodash/omit';

export const filterKeys = (store, config) => {
  if (config.whiteList) {
    return pick(config.whiteList, store);
  }
  if (config.blackList) {
    return omit(config.blackList, store);
  }
  return store;
};
