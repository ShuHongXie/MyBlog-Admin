import { combineReducers, createStore, applyMiddleware } from 'redux'
import { currentPage } from './reducers'
import createSagaMiddleware from 'redux-saga'
import { helloSaga } from './helloSaga'
const sagaMiddleware=createSagaMiddleware();

const allReducer = combineReducers({
  currentPage
})

export const store = createStore(
  allReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(helloSaga);