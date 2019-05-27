// @ts-ignore
import {ActionTypes} from "./action";
import {fromJS} from "immutable";
import {IMap} from "../interfaces";

export interface ISpecification {
  quotes: any;
  projects: any;
  firestore: any;
  selectedQuote: number;
  selectedProject: number;
}

const INITIAL_STATE = fromJS({
  quotes: [],
  projects: {},
  firestore: {},
  selectedQuote: null,
  selectedProject: null,
});

export const appReducer = (state: IMap<ISpecification> = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case ActionTypes.FIRST_ACTION:
      return state;
    case ActionTypes.FIRST_ACTION_SUCCEEDED:
      const {
        payload
      } = action;

      return state.set('projects', payload);
    default:
      return state;
  }
}


export default appReducer;
