import { createContext } from 'react';
import RootStore from './rootStore';

export const storeInstance = new RootStore();

export default createContext(storeInstance);
