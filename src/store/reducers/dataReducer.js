import { FETCH_DATA } from "../actions/types";

const testData = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default testData;