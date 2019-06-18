import { decorate, observable } from 'mobx';

class UserStore {
  notObservableProperty = 'test';

  id = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }
}

export default decorate(UserStore, {
  id: observable
});
