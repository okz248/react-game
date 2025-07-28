import { createStore } from "redux";
import { reducer } from "./reducers/Reducer";

export const store = createStore(reducer);