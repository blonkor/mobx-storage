import React from 'react';
import AsyncThunk from 'mobx-storage/lib';
import { isObservableObject } from 'mobx';
import { storeInstance } from './stores';

import Counter from './components/Counter';
import './App.css';

const thunk = new AsyncThunk(storeInstance, {
  whiteList: ['counterStore'],
  ignoreKeys: ['rootStore']
}, localStorage);

console.log('app', isObservableObject(storeInstance.counterStore));

thunk.init().then(() => {
  console.log(storeInstance)
});

function App() {
  return (
    <Counter />
  );
}

export default App;
