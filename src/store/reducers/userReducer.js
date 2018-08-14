//import { FETCH_DATA } from "../actions/types";

const userData = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_USER":
      return action.payload;
    default:
      return state;
  }
};

export default userData;