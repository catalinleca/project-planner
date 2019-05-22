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

export const makeSelectProjectTitle = () => createSelector(
  makeSelectProjects(),
  (projects: any) => {
    return projects.get('projectTitle');
  }
);

export default {
  selectReducerState
}