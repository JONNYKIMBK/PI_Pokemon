import { createStore, applyMiddleware } from "redux";
import reducer from "../reducers/reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
