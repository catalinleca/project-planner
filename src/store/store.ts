import {createStore, applyMiddleware, compose, Store} from "redux";
import Immutable, { fromJS } from 'immutable';
import {routerMiddleware} from "connected-react-router";
import createSagaMiddleware from 'redux-saga';
import {reducer} from './reducer';
import rootSaga from "./sagas";

// const sagaMiddleware = createSagaMiddleware();

export type PTStore = Store & {
  runSaga?: any;
  injectedReducers?: {
    [key: string]: any;
  }
  injectedSagas?: {
    [key: string]: any;
  }
};

export default function configureStore(history: any, data: any) {
  const reduxRouterMiddleware = routerMiddleware(history);
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [reduxRouterMiddleware, sagaMiddleware];

  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducer, data, composeEnhancers(
    applyMiddleware(...middleware)
  ));

  sagaMiddleware.run(rootSaga);

  return store;
}

// export default function configureStore({
//   initialState = {},
//   history,
// } = {} as any) {
//   const middlewares = [
//     sagaMiddleware,
//     routerMiddleware(history)
//   ]
//
//   // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//
//   const enhancers = [
//     applyMiddleware(...middlewares),
//   ];
//
//   const composeEnhancers =
//     typeof window === 'object' &&
//     (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//       (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//         immutable: Immutable,
//         shouldHotReload: false,
//       }) : compose;
//
//   const store: PTStore = createStore(
//     reducer,
//     fromJS(initialState),
//     composeEnhancers(...enhancers)
//   );
//
//   store.runSaga = sagaMiddleware.run;
//   store.injectedReducers = {
//     ...reducer,
//   }
//   store.injectedSagas = {}; // Saga registry
//
//   return store;
// }
