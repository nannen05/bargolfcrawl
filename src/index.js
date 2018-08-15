import React from "react";
import { render } from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import rootReducer from "./store/reducers";
//import { Router, Route } from 'react-router'
//import { Router } from 'react-router'
import { ConnectedRouter, routerMiddleware, connectRouter } from 'connected-react-router'
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom'
import { syncHistoryWithStore } from 'react-router-redux'
import { createBrowserHistory } from 'history';

import App from "./App";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Score from "./components/Score";
import PlayerScore from "./components/PlayerScore";

import { userData } from './data'
import './index.css'

const defaultState = {
  userData
};

const store = createStore(rootReducer, defaultState, applyMiddleware(reduxThunk));

const history = syncHistoryWithStore(createBrowserHistory(), store);
//const history = createBrowserHistory()
//const store = createStore(connectRouter(history)(rootReducer), {}, applyMiddleware(reduxThunk));

store.subscribe(() => console.log('Look ma, Redux!!'))

render(
  <Provider store={store}>
    <BrowserRouter>
	      <Switch>
		      <Route exact path="/" component={App}>
		      </Route>
		      <Route path="/login" component={Login}>
		      </Route>
		      <Route path="/signup" component={Signup}>
		      </Route>
		      <Route path="/scores" component={Score}>
		      </Route>
		      <Route path="/score/:player" component={PlayerScore}>
		      </Route>
	      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
