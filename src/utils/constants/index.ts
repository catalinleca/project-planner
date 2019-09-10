import {ProjectPhase, TaskStatus} from "../types/types";
import {Map} from "immutable";
import {UserProps} from "../interfaces/IUser/IUser";

export const AUTH_PATH = '/auth';
export const CREATE_ADMIN_PATH = '/createNewAdmin';
export const ADD_USER = '/addNewUser';

export const PROJECT_LIST = '/projectList';
export const PROJECT_DETAILS = `${PROJECT_LIST}/details`;

export const USER_LIST = '/userList';
export const USER_DETAILS = `${USER_LIST}/details`;

export const USER_TASKS_PATH = `${USER_DETAILS}/tasks`;
export const USER_PROFILE_PATH = `${USER_DETAILS}/profile`;
export const USER_SETTINGS_PATH = `${USER_DETAILS}/settings`;

export const HOME_PATH = '/home';

export const projectPhases: ProjectPhase[] = ['initial', 'planning', 'execution', 'closure'];

export const TaskColor = {
  toDo: '#FB9C01',
  inProgress: '#95E1FF',
  completed: '#3366ff',
  rejected: '#DF3100',
  accepted: '#33CC33',
}

const keys = Object.keys(TaskStatus);

export const taskStatusValues = Map().withMutations( taskStatuses => {
  keys.forEach( key => {
    taskStatuses.set(key, TaskStatus[key])
  })
});

export const formatStringDate = (date: any): string => {
  if (date) {
    const newDate = new Date(date)
    return newDate.getDate() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getFullYear()
  } else {
    return ''
  }
}

export const pick = (obj, props: Array<any>) => {
  if (!obj || !props) return;
  let picked = {}

  props.forEach( prop => picked[prop] = obj[prop])

  return picked;
}

