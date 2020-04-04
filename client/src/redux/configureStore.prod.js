import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(createLogger(), thunk)
  );
}
