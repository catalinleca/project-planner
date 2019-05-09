import {createStore, applyMiddleware, compose, Store} from "redux";
import Immutable, { fromJS } from 'immutable';
import {routerMiddleware} from "connected-react-router";
import createSagaMiddleware from 'redux-saga';
import {reducers} from './reducer';

const sagaMiddleware = createSagaMiddleware();

export type PTStore = Store & {
  runSaga?: any;
  injectedReducers?: {
    [key: string]: any;
  }
  injectedSagas?: {
    [key: string]: any;
  }
};


export default function configureStore({
  initialState = {},
  history,
} = {} as any) {
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history)
  ]

  // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  const composeEnhancers =
    typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        immutable: Immutable,
        shouldHotReload: false,
      }) : compose;

  // const store = createStore(reducers, data, composeEnhancers(
  //   applyMiddleware(...middlewares),
  // ));

  const store: PTStore = createStore(
    reducers,
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  // sagaMiddleware.run(rootSaga);
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {
    ...reducers,
  }
  store.injectedSagas = {}; // Saga registry

  return store;
}
