import { createStore, combineReducers } from "redux";
import videoReducer from "./reducers/videoReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
    video: videoReducer,
    user: userReducer
})

const store = createStore(rootReducer);

export default store;