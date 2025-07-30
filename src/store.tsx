import { createStore } from "redux";
import { Reducer } from "./reducers/Reducer";

export const store = createStore(Reducer);

export type NameType = ReturnType<typeof store.getState>;