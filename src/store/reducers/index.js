import { combineReducers } from "redux";
import { routerReducer } from 'react-router-redux'

import data from "./dataReducer";
import userData from "./userReducer";
import updateScore from "./updateScoreReducer";
import updateTotalScore from "./updateTotalScoreReducer";

import { USERS } from '../../data'

const reducers = combineReducers({
  data,
  userData,
  updateScore,
  updateTotalScore,
  routing: routerReducer
});

export default reducers