
export function userReducer(state = {email: null, isLoggedIn: false}, action) {
	switch (action.type) {
	case "SET_USER":
        const { email } = action.payload; // TODO make realistic
		return {...action.payload, isLoggedIn: !!email};
	default:
		return state;
	}
}

export default userReducer;


export const setUser = (user) => ({
	type: "SET_USER",
	payload: user,
});

