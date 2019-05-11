// @ts-ignore
import {ActionTypes} from "./action";
import {fromJS} from "immutable";
import {IMap} from "../interfaces/IMap/IMap";

export interface ISpecification {
  quotes: any;
  projects: any;
  selectedQuote: number;
  selectedProject: number;
}

const INITIAL_STATE = fromJS({
  quotes: [],
  projects: {},
  selectedQuote: null,
  selectedProject: null,
});

export const reducer = (state: IMap<ISpecification> = INITIAL_STATE, action: any) => {
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


export default reducer;