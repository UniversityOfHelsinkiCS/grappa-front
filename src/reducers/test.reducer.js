const INITIAL_STATE = {
	type: "INITIAL_STATE",
	doingStuff: false
}

export default function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case "DO_STUFF":
		  return {
		  	type: "DO_NOTHING",
		  	doingStuff: true
		  };
		default:
		  return state;
	}
}