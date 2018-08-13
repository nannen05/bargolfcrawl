import { DATAREF } from '../../firebase'
import { FETCH_DATA } from "./types";

export const fetchData = () => async dispatch => {
  DATAREF.on("value", snapshot => {
    dispatch({
      type: FETCH_DATA,
      payload: snapshot.val()
    });
  });
};
