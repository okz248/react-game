type Name = {
    text: string;
  }
  
type Action = {
    type: 'RENAME';
    text: string;
}

export const reducer = (state: Name[] = [], action: Action) => {
    switch(action.type){
        case "RENAME":
            return [
                ...state,
                {text: action.text}
            ]
            default:
                return state
    }
}