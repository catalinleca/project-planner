import {createStore, applyMiddleware, compose, Store} from "redux";
import Immutable, { fromJS } from 'immutable';
import {routerMiddleware} from "connected-react-router";
import createSagaMiddleware from 'redux-saga';
import {reducer} from './reducer';
import rootSaga from "./sagas";
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import firebase from '../base';
import { firebaseConfig } from "../base";
import { userConfig } from "../base";

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

// export default function configureStore(history: any, data: any) {
//   const reduxRouterMiddleware = routerMiddleware(history);
//   const sagaMiddleware = createSagaMiddleware();
//   const middleware = [reduxRouterMiddleware, sagaMiddleware];
//
//   const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//
//   const store = createStore(reducer, data, composeEnhancers(
//     applyMiddleware(...middleware)
//   ));
//
//   sagaMiddleware.run(rootSaga);
//
//   return store;
// }

function* helloSaga(getFirebase) {
  try {
    yield getFirebase().push('/some/path', { nice: 'work!' })
  } catch(err) {
    console.log('Error in saga!:', err)
  }
}

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
    reduxFirestore(firebase),
    reactReduxFirebase(firebase, userConfig)
  ];

  const composeEnhancers =
    typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        immutable: Immutable,
        shouldHotReload: false,
      }) : compose;

  const store: PTStore = createStore(
    reducer,
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  store.runSaga = sagaMiddleware.run(rootSaga, {getFirestore, getFirebase});
  store.injectedReducers = {
    ...reducer,
  }
  store.injectedSagas = {}; // Saga registry

  return store;
}
