import {createStore, applyMiddleware, compose, Store, combineReducers} from "redux";
import Immutable, { fromJS } from 'immutable';
import {connectRouter, routerMiddleware} from "connected-react-router";
import createSagaMiddleware from 'redux-saga';
import {reducer} from './reducer';
import rootSaga from "./sagas";
import { reduxFirestore, getFirestore, firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import firebase from '../base';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';


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

export default function configureStore({
  initialState = {},
  history,
} = {} as any) {
  const middlewares = [
    sagaMiddleware,
    thunk.withExtraArgument({ getFirestore}),
    routerMiddleware(history)
  ]

  // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const enhancers = [
    applyMiddleware(...middlewares),
    reduxFirestore(firebase),
    // reactReduxFirebase(firebase, userConfig)
  ];


  const composeEnhancers =
    typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        immutable: Immutable,
        shouldHotReload: false,
      }) : compose;

  const combinedReducers = combineReducers({
    router: connectRouter(history),
    ptReducer: reducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    form: formReducer
  })

  const store: PTStore = createStore(
    combinedReducers,
    // fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  store.runSaga = sagaMiddleware.run(rootSaga);
  store.injectedReducers = {
    ...combinedReducers,
  }
  store.injectedSagas = {}; // Saga registry

  return store;
}
