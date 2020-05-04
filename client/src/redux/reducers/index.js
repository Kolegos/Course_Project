import { combineReducers } from "redux";
import posts from "./postReducer";
import sessions from "./sessionReducer";
import users from "./userReducer";
import posts2 from "./postReducer2";
import categories from "./categoriesReducer";

const rootReducer = combineReducers({
  posts,
  posts2,
  sessions,
  users,
  categories,
});

export default rootReducer;
