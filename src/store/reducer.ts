// @ts-ignore
import {ActionTypes} from "./action";

const INITIAL_STATE = {
  quotes: {}
}

export const reducer = (state: any = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case ActionTypes.FIRST_ACTION:
      console.log('action: ', action);
      console.log('state: ', state);

      const newState = {...state};
      newState.quotes = action.payload.data;

      return newState;
    case ActionTypes.FIRST_ACTION_SUCCEEDED:
      console.log('oleee ole ole oa');
      return state;
    default:
      return state;
  }
}
