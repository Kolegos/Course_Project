import { combineReducers } from "redux";
import posts from "./postReducer";
import sessions from "./sessionReducer";
import users from "./userReducer";
import posts2 from "./postReducer2";

const rootReducer = combineReducers({
  posts,
  posts2,
  sessions,
  users,
});

export default rootReducer;
