import React from 'react';
import AsyncThunk from 'mobx-storage/lib';
import { isObservableObject } from 'mobx';
import { storeInstance } from './stores';

import Counter from './components/Counter';
import './App.css';

const migrations = {
  0: (state) => {
    return {
      ...state,
    }
  },
  1: (state) => {
    return{
      ...state,
    }
  }
};

const thunk = new AsyncThunk(storeInstance, {
  debug: true,
  whiteList: ['counterStore'],
  ignoreKeys: ['rootStore'],
  version: 1,
  migrations,
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
