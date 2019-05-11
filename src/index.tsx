import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from 'history';
import {library} from "@fortawesome/fontawesome-svg-core";
import {faTrash, faInbox, faEnvelope, faChevronLeft, faChevronRight, faBars} from "@fortawesome/free-solid-svg-icons";
import AppWrapper from "./containers/AppWrapper/AppWrapper";
import configureStore from './store/store';
import {reducer} from './store/reducer';
library.add(faTrash, faInbox, faEnvelope, faChevronLeft, faChevronRight, faBars)

const initialState: object = {};
const history = createBrowserHistory()
const store = configureStore({
  initialState,
  history,
})

// const store = configureStore(
//   history,
//   initialState,
// )


const app = (
  <AppWrapper
    ptStore={store}
  >
    <App />
  </AppWrapper>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
