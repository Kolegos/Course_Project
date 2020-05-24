import { combineReducers } from "redux";
import posts from "./postReducer";
import sessions from "./sessionReducer";
import users from "./userReducer";
import posts2 from "./postReducer2";
import categories from "./categoriesReducer";
import features from "./featuresReducer";
import comments from "./commentReducer";

const rootReducer = combineReducers({
  posts,
  posts2,
  sessions,
  users,
  categories,
  features,
  comments,
});

export default rootReducer;
