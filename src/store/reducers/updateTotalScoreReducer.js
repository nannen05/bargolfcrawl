import update from 'react-addons-update';
import { db } from '../../firebase'

const updatedTotalScore = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_TOTALSCORE":

   	 	db.getPlayerScore(action.uid, action.updatedTotalScore)
   	 	//db.getPlayerScore(action.uid)

		return state;
    default:
      return state;
  }
};

export default updatedTotalScore;