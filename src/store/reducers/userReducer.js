//import { FETCH_DATA } from "../actions/types";
import update from 'react-addons-update';

const userData = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_USER":
	    console.log("Incrementing Likes!!");
	    const i = action.userID;
		const newUpdate = update(state[i].courseScore, {[action.holeNumber]: {score: {$set: (parseInt(action.updatedScore, 10) || 0) }}});
		const newScore = update(state[i], {
			courseScore: {$set: newUpdate}
		})
		let PlayerScore = []
	      newScore.courseScore.map((value, index) => {
	          PlayerScore.push( value.score )
	      })
		const newState = [
        	...state.slice(0,i), // before the one we are updating
		        {
		        	"id": newScore.id,
		        	"name": newScore.name,
		        	courseScore: newScore.courseScore,
		        	totalScore: PlayerScore.reduce((a, b) => +a + +b)
		        },
	        ...state.slice(i + 1), // after the one we are updating
	    ]

	    console.log(newState)

		return newState;
    default:
      return state;
  }
};

export default userData;
