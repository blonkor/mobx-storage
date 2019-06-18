import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import RootStore from '../stores';

const Counter = observer(() => {
  const rootStore = useContext(RootStore);

  const incrementCounter = () => {
    rootStore.counterStore.increment();
  };

  return (
    <div>
      <span>{rootStore.counterStore.counterValue}</span>
      <button onClick={incrementCounter}>+</button>
    </div>
  )
});

export default Counter;
