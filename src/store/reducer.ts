// @ts-ignore
import {ActionTypes} from "./action";
import {fromJS} from "immutable";
import {IMap} from "../interfaces/IMap/IMap";

interface ISpecification {
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
      console.log('FIRST_ACTION in reducer: ');
      return state;
    case ActionTypes.FIRST_ACTION_SUCCEEDED:
      const {
        payload
      } = action;

      console.log('FIRST_ACTION_SUCCEEDED: ', payload);


      return state.set('projects', payload);
    default:
      return state;
  }
}
