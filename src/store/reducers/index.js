import { combineReducers } from "redux";
import { routerReducer } from 'react-router-redux'

import data from "./dataReducer";

const reducers = combineReducers({
  data,
  routing: routerReducer
});

export default reducers