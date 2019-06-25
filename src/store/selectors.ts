import {
  Map,
  Set,
  OrderedSet,
} from 'immutable';
import {
  createSelector,
} from 'reselect';
import {
  IMap,
} from '../utils/interfaces';

let initTime;

export const selectReducerState = () => (state: any) => {
  if (state != null) {
    return state;
  }
  const now = Date.now();
  if (initTime == null) {
    initTime = now;
  }

  if (now - initTime > 5000) {
    console.warn(`Missing Reducer State, have you added the Module to your application?`, { // tslint:disable-line
      state,
    });
  }
  return Map();
};

export const makeSelectProjects = () => createSelector(
  selectReducerState(),
  (state: any) => {
    return state.get('projects')  || OrderedSet<number>();
  }
);

export const makeSelectTaskDrawerOpen = () => createSelector(
  selectReducerState(),
  (state: any) => {
    return state.get('taskDrawerOpen');
  }
);

export const makeSelectProjectTitle = () => createSelector(
  makeSelectProjects(),
  (projects: any) => {
    return projects.get('projectTitle');
  }
);

export const makeSelectSelectedProject = () => createSelector(
  selectReducerState(),
  (state: any) => {
    return state.get('selectedProject');
  }
);

export const makeSelectSelectedUser = () => createSelector(
  selectReducerState(),
  (state: any) => {
    return state.get('selectedUser');
  }
);

export const makeSelectSelectedTask = () => createSelector(
  selectReducerState(),
  (state: any) => {
    return state.get('selectedTask');
  }
);

export default {
  selectReducerState
}