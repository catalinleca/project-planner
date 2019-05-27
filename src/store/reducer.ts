// @ts-ignore
import {ActionTypes} from "./action";
import {fromJS} from "immutable";
import {IMap} from "../utils/interfaces/IMap/IMap";

export interface ISpecification {
  users: any;
  projects: any;
  selectedQuote: number;
  selectedProject: number;
}

const INITIAL_STATE = fromJS({
  users: [],
  projects: {},
  selectedQuote: null,
  selectedProject: null,
});

export const reducer = (state: IMap<ISpecification> = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case ActionTypes.GET_PROJECTS:
      return state.set('projects', action.payload);
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