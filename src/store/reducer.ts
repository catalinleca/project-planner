// @ts-ignore
import {ActionTypes} from "./action";
import {fromJS} from "immutable";
import {IMap} from "../utils/interfaces";

export interface ISpecification {
  users: any;
  projects: any;
  selectedProject: string;
  selectedTask: string;
  selectedUser: string;
  taskDrawerOpen: boolean,

}

const INITIAL_STATE = fromJS({
  users: [],
  projects: {},
  selectedProject: '',
  selectedTask: '',
  selectedUser: '',
  taskDrawerOpen: false,
});

export const reducer = (state: IMap<ISpecification> = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case ActionTypes.GET_PROJECTS:
      return state.set('projects', action.payload);
    case ActionTypes.FIRST_ACTION_SUCCEEDED:
      const {
        payload: john
      } = action;

      return state.set('projects', john);
    case ActionTypes.SELECT_PROJECT:
      return state.set('selectedProject', action.payload);
    case ActionTypes.SELECT_TASK:
      return state.set('selectedTask', fromJS(action.payload));
    case ActionTypes.SELECT_USER:
      return state.set('selectedUser', action.payload);
    case ActionTypes.TOGGLE_TASK_DRAWER:
      const currentDrawerState = state.get('taskDrawerOpen')
      return state.set('taskDrawerOpen', !currentDrawerState);
    case ActionTypes.CLOSE_TASK_DRAWER:
      return state.set('taskDrawerOpen', false);
    default:
      return state;
  }
}


export default reducer;