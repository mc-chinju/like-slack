import { createStore, combineReducers, compose } from 'redux';
import fromReducer from '../reducers/chat';

/* Storeの実装 */

const initialState = {
  value: [],
};

export default function configureStore(){
  return createStore(fromReducer, initialState);
}
