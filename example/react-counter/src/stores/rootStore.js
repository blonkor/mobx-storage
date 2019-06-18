import UserStore from './userStore';
import CounterStore from './counterStore';

class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
    this.counterStore = new CounterStore(this);
  }
}

export default RootStore;
