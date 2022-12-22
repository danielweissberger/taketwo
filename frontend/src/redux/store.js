import { createStore } from 'redux';
import videoReducer from './reducers/videoReducer'

const store = createStore(videoReducer)

export default store;