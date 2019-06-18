import { observable, decorate, action, computed } from 'mobx';

class CounterStore {
  counter = 0;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  increment() {
    this.counter = this.counter + 1;
  }

  get counterValue() {
    return this.counter;
  }
}

export default decorate(CounterStore, {
  counter: observable,
  increment: action,
  counterValue: computed
});
