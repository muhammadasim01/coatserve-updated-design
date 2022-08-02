import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { dynamicColor } from "./reducers/dynamicColorReducer";
const store = createStore(
  combineReducers({ colorReducer: dynamicColor }),

  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
