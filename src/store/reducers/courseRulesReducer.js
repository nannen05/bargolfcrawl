const courseRules = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_COURSERULES":
    	console.log(action.payload)
		return action.payload
    default:
      return state;
  }
};

export default courseRules