import update from 'react-addons-update';
import { db } from '../../firebase'

const updatedScore = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_SCORE":

   	 	db.setScore(action.uid, action.updatedScore, action.holeNumber, action.updatedTotalScore)

		return state;
    default:
      return state;
  }
};

export default updatedScore;