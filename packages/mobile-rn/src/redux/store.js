import { createStore } from "redux";
import { firstReducer } from "./reducers";

export const store = createStore(firstReducer) ;