import { DATAREF } from '../../firebase'
import { FETCH_DATA } from "./types";
import { USERS } from '../../data'

const SCOREDATA = [
	{
		"hole": 5,
		"score": "",
	},
	{
		"hole": 5,
		"score": "",
	},
	{
		"hole": 5,
		"score": "",
	},
	{
		"hole": 5,
		"score": "",
	}
]

export function updateScore(uid, updatedScore, holeNumber, updatedTotalScore) {
  return {
    type: 'UPDATE_SCORE',
    uid,
    updatedScore,
    updatedTotalScore,
    holeNumber
  }
}

export function updateTotalScore(uid, updatedTotalScore) {
  return {
    type: 'UPDATE_TOTALSCORE',
    uid,
    updatedTotalScore
  }
}

// export const fetchData = () => async dispatch => {
//   DATAREF.on("value", snapshot => {
//     dispatch({
//       type: FETCH_DATA,
//       payload: snapshot.val()
//     });
//   });
// };

export const fetchUser = () => async dispatch => {
	dispatch({
		type: "FETCH_USER",
		payload: USERS
	})
}
