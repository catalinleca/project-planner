import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';
import {library} from "@fortawesome/fontawesome-svg-core";
import {faTrash, faInbox, faEnvelope, faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import AppWrapper from "./containers/AppWrapper/AppWrapper";

library.add(faTrash, faInbox, faEnvelope, faChevronLeft, faChevronRight)

const app = (
  <AppWrapper>
    <App />
  </AppWrapper>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
