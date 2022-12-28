
export function videoReducer(state = {constraints: {audioinput:"", videoinput:""}}, action) {
	switch (action.type) {
	case "SET_CONSTRAINTS":
		console.log(action.payload, state.constraints);
		return {...state, constraints: {...state.constraints, ...action.payload}};
	default:
		return state;
	}
}

export default videoReducer;


export const setConstraints = (constraints) => ({
	type: "SET_CONSTRAINTS",
	payload: constraints,
});

