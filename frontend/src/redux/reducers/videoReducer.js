
export function videoReducer(state = {}, action) {
    switch (action.type) {
      case 'SET_CONSTRAINTS':
        console.log(action.payload, 'REDUCER!')
        return action.payload
      default:
        return state
    }
  }

  export default videoReducer;


  export const setConstraints = (constraints) => ({
    type: 'SET_CONSTRAINTS',
    payload: constraints,
  })