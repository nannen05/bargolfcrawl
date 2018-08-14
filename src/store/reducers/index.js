import { combineReducers } from "redux";
import { routerReducer } from 'react-router-redux'

import data from "./dataReducer";
import userData from "./userReducer";

import { USERS } from '../../data'

const reducers = combineReducers({
  data,
  userData,
  routing: routerReducer
});

export default reducers