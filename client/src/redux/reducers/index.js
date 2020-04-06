import { combineReducers } from "redux";
import posts from "./postReducer";
import posts2 from "./postReducer2";

const rootReducer = combineReducers({
  posts,
  posts2,
});

export default rootReducer;
