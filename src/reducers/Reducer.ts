import type { ActioType } from "../actions/Action";

export type Name = {
    name: string;
    gender: string;
  }

const nameState: Name = {
    name: "",
    gender: ""
};

export const Reducer = (state = nameState, action: ActioType): Name => {
    switch(action.type){
        case "RENAME":
            return {
                ...state,
                name: action.userdata.name,
                gender: action.userdata.gender
            };
        default:
            return state
    }
};