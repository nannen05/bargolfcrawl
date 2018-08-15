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

export function changeScore(updatedScore, holeNumber, userID) {
  return {
    type: 'FETCH_USER',
    updatedScore,
    holeNumber,
    userID
  }
}

export const fetchData = () => async dispatch => {
  DATAREF.on("value", snapshot => {
    dispatch({
      type: FETCH_DATA,
      payload: snapshot.val()
    });
  });
};

export const fetchUser = () => async dispatch => {
	dispatch({
		type: "FETCH_USER",
		payload: USERS
	})
}
