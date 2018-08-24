import { combineReducers } from "redux";
import { routerReducer } from 'react-router-redux'

import data from "./dataReducer";
import userData from "./userReducer";
import userGames from "./userGameReducer";
import updateScore from "./updateScoreReducer";
import updateTotalScore from "./updateTotalScoreReducer";
import courseRules  from "./courseRulesReducer";

import { USERS } from '../../data'

const reducers = combineReducers({
  data,
  courseRules,
  userData,
  userGames,
  updateScore,
  updateTotalScore,
  routing: routerReducer
});

export default reducers