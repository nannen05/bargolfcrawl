//import { FETCH_DATA } from "../actions/types";
import update from 'react-addons-update';
import { db } from '../../firebase/firebase'

const userGames = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_USERGAMES":
       return action.payload
    default:
      return state;
  }
};

export default userGames;