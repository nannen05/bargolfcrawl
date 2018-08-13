import React from "react";
import { render } from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import rootReducer from "./store/reducers";
import { Router, Route } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { createBrowserHistory } from 'history';
import App from "./App";
import './index.css'

const store = createStore(rootReducer, {}, applyMiddleware(reduxThunk));

const history = syncHistoryWithStore(createBrowserHistory(), store);

store.subscribe(() => console.log('Look ma, Redux!!'))

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);
